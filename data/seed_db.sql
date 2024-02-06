BEGIN;

INSERT INTO "races" ("name", "speed", "strength_bonus", "dexterity_bonus", "constitution_bonus", "inteligence_bonus", "wisdom_bonus", "charisma_bonus", "languages", "traits") 
VALUES
('Haut-Elfe', '9m', 0, 2, 0, 1, 0, 0, 'Commun, Elfique', 'Vision dans le noir (18m), Sens aiguisés (Maitrise de Perception), Ascendance féérique (Avantage aux JDS contre les effets de charme et la magie ne peut vous endormir), Transe, Entraînement aux armes elfiques'),
('Elfe des bois', '10.50m', 0, 2, 0, 0, 1, 0, 'Commun, Elfique', 'Vision dans le noir (18m), Sens aiguisés (Maitrise de Perception), Ascendance féérique (Avantage aux JDS contre les effets de charme), Transe, Entraînement aux armes elfiques, Cachette naturelle (Vous pouvez tenter de vous cacher dans une zone à visibilité réduite)'),
('Elfe noir (Drow)', '9m', 0, 2, 0, 0, 0, 1, 'Commun, Elfique', 'Vision dans le noir supérieure (36m), Sens aiguisés (Maitrise de Perception), Ascendance féérique (Avantage aux JDS contre les effets de charme), Transe, Entraînement aux armes drows, Sensibilité au soleil, Magie drow'),
('Halfelin pied-léger', '7.50m', 0, 2, 0, 0, 0, 1, 'Commun et Halfelin', 'Chanceux (Relance des 1 caracts et JDS), Brave (Avantage JDS contre être effrayé), Agilité halfeline, Discrétion naturelle'),
('Halfelin robuste', '7.50m', 0, 2, 1, 0, 0, 0, 'Commun et Halfelin', 'Chanceux (Relance des 1 caracts et JDS), Brave (Avantage JDS contre être effrayé), Agilité halfeline, Résistance des robustes (Avantage JDS poison + Résistance)'),
('Humain', '9m', 1, 1, 1, 1, 1, 1, 'Commun et une langue de votre choix', ' '),
('Nain des collines','7.50m', 0, 0, 2, 0, 1, 0, 'Commun et Nain', 'Vision dans le noir (18m), Résistance naine (Avantage JDS Poison et résistance), Entraînement aux armes naines, Maîtrise des outils (forgeron, brasseur ou maçon), Connaissance de la pierre, Ténacité naine' ),
('Nain des montagnes', '7.50m', 2, 0, 2, 0, 0, 0, 'Commun et Nain', 'Vision dans le noir (18m), Résistance naine (Avantage JDS Poison et résistance), Entraînement aux armes naines, Maîtrise des outils (forgeron, brasseur ou maçon), Connaissance de la pierre, Formation au port des armures naines' ),
('Demi-Elfe', '9m', 0, 0, 0, 0, 0, 2, 'Commun, Elfique et une autre langue de votre choix', 'Augmentation de deux de vos caractéristiques de 1, Vision dans le noir (18m), Ascendance féérique (Avantage aux JDS contre les effets de charme et la magie ne peut vous endormir), Polyvalence (vous gagnez la maîtrise de deux compétences au choix)'),
('Demi-Orc', '9m', 2, 0, 1, 0, 0, 0, 'Commun et Orc', 'Vision dans le noir (18m), Menaçant (Maîtrise intimidation), Endurance implacable (Lorsque vous tombez à 0pv, vous restez à 1pv *hors one shot*), Attaques sauvages'),
('Drakéide', '9m', 2, 0, 0, 0, 0, 1, 'Commun et Draconique', 'Résistance aux dégâts (associés à votre ascendance draconique)'),
('Gnome des forêts', '7.50m', 0, 1, 0, 2, 0, 0, 'Commun et Gnome', 'Vision dans le noir (18m), Ruse gnome (Avantage JDS Intel, Sagesse, Charisme), Illusionniste-né, Communication avec les petits animaux'),
('Gnome des roches', '7.50m', 0, 0, 1, 2, 0, 0, 'Commun et Gnome', 'Vision dans le noir (18m), Ruse gnome (Avantage JDS Intel, Sagesse, Charisme), Connaissance en ingénierie, Bricoleur'),
('Tieffelin', '9m', 0, 0, 0, 1, 0, 2, 'Commun et Infernal', 'Vision dans le noir (18m), Résistance infernale (dégâts de feu), Ascendance infernale');

INSERT INTO "classes" ("name", "health_dice", "starting_health", "starting_equipment_options")
VALUES
('Barbare', '1d12', 12, '(a) une hache à deux mains ou (b) n''importe quelle arme de guerre de corps à corps /et/ (a) deux hachettes ou (b) n''importe quelle arme courante /et/ un sac d''explorateur et quatre javelines'),
('Barde', '1d8', 8, '(a) une rapière, (b) une épée longue ou (c) n''importe quelle arme courante /et/ (a) un sac de diplomate ou (b) un sac d''artiste /et/ (a) un luth ou (b) n''importe quel autre instrument de musique /et/ une armure de cuir et une dague'),
('Clerc', '1d8', 8, '(a) une masse d''armes ou (b) un marteau de guerre (si vous le maîtrisez) /et/ (a) une armure d''écailles ou (b) une armure de cuir ou (c) une cotte de mailles (si vous la maîtrisez) /et/ (a) une arbalète légère et 20 carreaux ou (b) une arme courante /et/ (a) un sac d''ecclésiastique ou (b) un sac d''explorateur /et/ un bouclier et un symbole sacré'),
('Druide', '1d8', 8, '(a) une masse d''armes ou (b) un marteau de guerre (si vous le maîtrisez) /et/ (a) un cimeterre ou (b) une arme courante de corps à corps /et/ une armure de cuir, un sac d''explorateur et un focaliseur druidique'),
('Ensorceleur', '1d6', 6, '(a) une arbalète légère et 20 carreaux ou (b) n''importe quelle arme courante /et/ (a) une sacoche à composantes ou (b) un focaliseur arcanique /et/ (a) un sac d''exploration souterraine ou (b) un sac d''explorateur /et/ deux dagues'),
('Guerrier', '1d10', 10, '(a) une cotte de mailles ou (b) une armure de cuir, un arc long et 20 flèches /et/ (a) une arme de guerre et un bouclier ou (b) deux armes de guerre /et/ (a) une arbalète légère et 20 carreaux ou (b) deux hachettes /et/ (a) un sac d''exploration souterraine ou (b) un sac d''explorateur'),
('Magicien', '1d6', 6, '(a) un bâton ou (b) une dague /et/ (a) une sacoche à composantes ou (b) un focaliseur arcanique /et/ (a) un sac d''érudit ou (b) un sac d''explorateur /et/ un grimoire'),
('Moine', '1d8', 8, 'a) une épée courte ou (b) n''importe quelle arme courante /et/ (a) un sac d''exploration souterraine ou (b) un sac d''explorateur /et/ 10 fléchettes'),
('Occultiste', '1d8', 8, '(a) une arbalète légère et 20 carreaux ou (b) n''importe quelle arme courante /et/ (a) une sacoche à composantes ou (b) un focaliseur arcanique /et/ (a) un sac d''érudit ou (b) un sac d''exploration souterraine /et/ une armure de cuir, n''importe quelle arme courante, et deux dagues'),
('Paladin', '1d10', 10, '(a) une arme de guerre et un bouclier ou (b) deux armes de guerre /et/ (a) cinq javelines ou (b) n''importe quelle arme courante de corps à corps /et/ (a) un sac d''ecclésiastique ou (b) un sac d''explorateur /et/ une cotte de mailles et un symbole sacré'),
('Rôdeur', '1d10', 10, '(a) armure d''écailles ou (b) armure de cuir /et/ (a) deux épées courtes ou (b) deux armes courantes de corps à corps /et/ (a) un sac d''exploration souterraine ou (b) un sac d''explorateur /et/ un arc long et un carquois avec 20 flèches'),
('Roublard', '1d8', 8, '(a) une rapière ou (b) une épée courte /et/ (a) un arc court et un carquois de 20 flèches ou (b) une épée courte /et/ (a) un sac de cambrioleur, (b) un sac d''exploration souterraine ou (c) un sac d''explorateur /et/ une armure de cuir, deux dagues et des outils de voleur');

INSERT INTO "backgrounds" ("name", "mastered_tools","starting_equipment", "feature")
VALUES
('Acolyte', ' ', 'un symbole sacré (cadeau reçu lorsque vous êtes entré en sacerdoce), un livre de prières, 5 bâtons d''encens, des habits de cérémonie, des vêtements communs et une bourse contenant 15 po.', 'Abri du fidèle' ),
('Artisan de Guilde', 'Un type d''outil d''artisan', 'un jeu d''outil d''artisan (de votre choix), une lettre de recommandation de votre guilde, des vêtements de voyage et une bourse contenant 15 po.', 'Membre de guilde'),
('Artiste', 'kit de déguisement, un type d''instument de musique', 'un instrument de musique (de votre choix), un cadeau d''un admirateur (une lettre d''amour, une mèche de cheveux, une babiole), un costume et une bourse contenant 15 po.', 'À la demande du public'),
('Charlatan', 'kit de contrefaçon, kit de déguisement', 'des vêtements fins, un kit de déguisement, des outils d''escroquerie de votre choix (10 bouteilles bouchonnées remplies d''un liquide coloré, dés truqués, cartes marquées, fausse chevalière de duc, ...) et une bourse contenant 15 po.', 'Fausse identité'),
('Criminel', 'un type de jeu, outils de voleur', 'un pied-de-biche, des vêtements communs sombres avec une capuche et une bourse contenant 15 po.', 'Accointances avec la pègre'),
('Enfant des rues', 'kit de déguisement, outils de voleur', 'un petit couteau, une carte de la ville dans laquelle vous avez grandi, une souris domestiquée, un souvenir de vos parents, des vêtements communs et une bourse contenant 10 po.', 'Secrets de la ville'),
('Ermite', 'kit d''herboriste', 'un étui à parchemin remplis de notes sur vos études ou vos prières, une couverture pour l''hiver, des vêtements communs, un kit d''herboriste et 5 po.', 'Découverte'),
('Héros du peuple', 'un type d''outil d''artisan, véhicules (terrestres)', 'un jeu d''outil d''artisan (de votre choix), une pelle, un pot en fer, des vêtements communs et une bourse contenant 10 po.', 'Hospitalité rustique'),
('Noble', 'un type de jeu', 'des vêtements fins, une chevalière, une lettre de noblesse et une bourse contenant 25 po.', 'Apanage de la noblesse'),
('Sage', ' ', 'une bouteille d''encre noire, une plume, un petit couteau, une lettre d''un collègue mort posant une question à laquelle vous n''avez pas encore été en mesure de répondre, des vêtements communs et une bourse contenant 10 po.', 'Chercheur'),
('Sauvageon', 'un type d''instrument de musique', 'un bâton, un piège à mâchoires, un trophée d''animal que vous avez tué, des vêtements de voyage et une bourse contenant 10 po.', 'Éternel vagabond'),
('Soldat', 'un type de jeu, véhicules (terrestre)', 'un insigne de grade, un trophée pris sur un ennemi mort (une dague, une lame brisée, un morceau de bannière), un jeu de dés en os ou un jeu de cartes, des vêtements communs et une bourse contenant 10 po.', 'Grade militaire');

INSERT INTO "skills" ("name")
VALUES
('Acrobaties'),
('Arcanes'),
('Athlétisme'),
('Discrétion'),
('Dressage'),
('Escamotage'),
('Histoire'),
('Intimidation'),
('Investigation'),
('Médecine'),
('Nature'),
('Perception'),
('Perspicacité'),
('Persuasion'),
('Religion'),
('Représentation'),
('Survie'),
('Tromperie');

COMMIT;