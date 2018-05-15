# Partie import des données en base

## Préparation de la base

Démarrage de la base PostgreSQL dans Docker :

    docker run \
        --rm \
        --name mounty_view \
        -e POSTGRES_PASSWORD=toto \
        -d \
        -p 15432:5432 \
        postgres:10.3

Pour créer le schéma il faut déjà se connecter en psql :

    docker run -it \
        --rm \
        --link mounty_view:postgres \
        postgres:10.3 \
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

## Lancer ensuite l'import des vues via la commande 

    node vue_to_pg.js

(Il faut potentiellement changer les credentials PostgreSQL dans ce fichier)

