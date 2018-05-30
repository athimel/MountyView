# Partie import des données en base

## Préparation de la base

Démarrage de la base PostgreSQL dans Docker :

    docker run \
        --rm \
        --name mounty_view \
        -e POSTGRES_PASSWORD=toto \
        -d \
        -p 15432:5432 \
        postgres:latest

Pour créer le schéma il faut déjà se connecter en psql :

    docker run -it \
        --rm \
        --link mounty_view:postgres \
        postgres:latest \
        psql -h postgres -U postgres

Puis importer le contenu du fichier [schema.sql](/scripts/schema.sql)

## Installation du driver PostgreSQL pour NodeJS

    npm install pg

## Import des informations publiques des guildes (à partir d'une copie du FTP de MH)

    node guildes_to_pg.js

(Il faut potentiellement changer les credentials PostgreSQL dans ce fichier)

## Import des informations publiques des trolls (à partir d'une copie du FTP de MH)

    node trolls_to_pg.js

(Il faut potentiellement changer les credentials PostgreSQL dans ce fichier)

## Conversion d'une vue issue de SP_Vue2.php en JSON

    node vue_json.js

Ça démarre un serveur HTTP sur le port 3001 qui va lire les informations sur le port 3000 (données brutes) et qui renvoi le contenu des vues au format JSON

Pour tester, se rendre sur http://127.0.0.1:3001/?id=104259
(fonctionne également avec 88222 et 50362)


## Lancer ensuite l'import des vues via la commande 

    node vue_to_pg.js

(Il faut potentiellement changer les credentials PostgreSQL dans ce fichier)

