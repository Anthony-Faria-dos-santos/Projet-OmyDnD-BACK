#!/bin/bash
# Pensser a se connecter à HEROKU dans son terminal avant, avec la commande "heroku login" 

# Nom de votre application Heroku
HEROKU_APP_NAME="ohmydnd"

# Récupérer l'URL de la base de données depuis Heroku
DATABASE_URL=$(heroku config:get DATABASE_URL -a $HEROKU_APP_NAME)

# Vérifier si DATABASE_URL a été récupéré
if [ -z "$DATABASE_URL" ]
then
    echo "Erreur : Impossible de récupérer DATABASE_URL depuis Heroku."
    exit 1
else
    echo "DATABASE_URL récupéré avec succès."
fi

# Mettre à jour le fichier .env
# Crée un backup du fichier .env existant
cp .env .env.backup

# Recherche et remplace DATABASE_URL dans le fichier .env, crée le fichier s'il n'existe pas
if grep -q DATABASE_URL .env; then
    # DATABASE_URL existe, le mettre à jour
    sed -i.bak "s|DATABASE_URL=.*|DATABASE_URL=${DATABASE_URL}|g" .env
    echo "DATABASE_URL mis à jour dans le fichier .env."
else
    # DATABASE_URL n'existe pas, l'ajouter avec un retour à la ligne au début
    echo -e "\nDATABASE_URL=${DATABASE_URL}" >> .env
    echo "DATABASE_URL ajouté au fichier .env."
fi

# Nettoyage: supprime les copies de sauvegarde si elles existent
[ -f .env.bak ] && rm .env.bak
[ -f .env.backup ] && rm .env.backup

