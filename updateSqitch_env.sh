#!/bin/bash

# Vérifier si Python 3 est installé
if ! command -v python3 &> /dev/null; then
    echo "Python 3 n'est pas installé."
    echo "Veuillez installer Python 3 pour continuer."
    # Instructions d'installation pour Ubuntu/Debian
    echo "Sur un système Debian/Ubuntu, vous pouvez l'installer avec :"
    echo "sudo apt update && sudo apt install python3"
    # Sortir du script si Python 3 n'est pas installé
    exit 1
else
    echo "Python 3 est détecté. Mise à jour de sqitch.conf en cours..."
    # Exécuter le script Python pour mettre à jour sqitch.conf
    python3 - <<EOF
import os
import re
import shutil  # Importer le module shutil

# Chemin du fichier sqitch.conf et sqitch.conf.exemple
sqitch_conf_path = 'sqitch.conf'
sqitch_conf_example_path = 'sqitch.conf.exemple'

# Vérifier si sqitch.conf existe, sinon copier depuis sqitch.conf.exemple
if not os.path.exists(sqitch_conf_path):
    if os.path.exists(sqitch_conf_example_path):
        print(f"{sqitch_conf_path} n'existe pas, création à partir de {sqitch_conf_example_path}.")
        shutil.copy(sqitch_conf_example_path, sqitch_conf_path)
    else:
        print(f"Le fichier {sqitch_conf_example_path} est introuvable. Impossible de continuer.")
        exit(1)

# Charger DATABASE_URL depuis le fichier .env
database_url = None
with open('.env', 'r') as file:
    for line in file:
        if line.startswith('DATABASE_URL'):
            database_url = line.strip().split('=')[1]
            break

# Retirer le préfixe 'postgres:' si présent
database_url = database_url.replace('postgres:', '')

# Sortir si DATABASE_URL n'est pas trouvé
if not database_url:
    print("DATABASE_URL non trouvé dans .env")
    exit(1)

# Préparer la nouvelle ligne target avec la valeur DATABASE_URL
new_target_line = '      target = db:pg:' + database_url

# Flag pour indiquer si la section [engine "pg"] a été trouvée
in_pg_section = False
# Flag pour indiquer si la ligne target a été mise à jour
target_updated = False

# Lire le contenu de sqitch.conf
with open(sqitch_conf_path, 'r') as file:
    lines = file.readlines()

# Rechercher et mettre à jour ou ajouter la ligne target
updated_lines = []
for line in lines:
    if '[engine "pg"]' in line:
        in_pg_section = True
    elif in_pg_section and not target_updated and re.match(r'\s*target =', line):
        # Remplacer la première ligne target trouvée dans la section
        line = new_target_line + '\n'
        target_updated = True
    elif in_pg_section and line.strip() == '' and not target_updated:
        # Si on trouve une ligne vide avant d'avoir trouvé une ligne target, ajouter la ligne target
        updated_lines.append(new_target_line + '\n')
        target_updated = True
        in_pg_section = False  # Présume fin de section, ajuster selon besoin
    elif in_pg_section and line.startswith('[') and not target_updated:
        # Fin de section sans trouver target, ajouter la ligne target juste avant
        updated_lines.append(new_target_line + '\n')
        target_updated = True
        in_pg_section = False  # Fin de section
    
    updated_lines.append(line)

# Écrire le contenu modifié dans sqitch.conf
with open(sqitch_conf_path, 'w') as file:
    file.writelines(updated_lines)

EOF
    echo "sqitch.conf a été mis à jour."
fi
