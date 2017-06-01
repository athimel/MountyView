# POC dont l'objectif est de récupérer, parser, aggrémenter et stocker les vues MH

Prérequis : 
* NodeJs 
* Docker

## Émulation de SP_Vue2.php

    node vue_mock.js

Ça démarre un serveur HTTP sur le port 3000 qui renvoi le contenu des vues contenues dans le dossier "vues"

Pour tester, se rendre sur http://127.0.0.1:3000/?id=104259
(fonctionne également avec 88222 et 50362)


## Conversion d'une vue issue de SP_Vue2.php en JSON

    node vue_json.js

Ça démarre un serveur HTTP sur le port 3001 qui va lire les informations sur le port 3000 (données brutes) et qui renvoi le contenu des vues au format JSON

Pour tester, se rendre sur http://127.0.0.1:3001/?id=104259
(fonctionne également avec 88222 et 50362)


## Importer ces vues dans une base Neo4j

Démarrage de la base Neo4j :

    docker run \
        --publish=7474:7474 --publish=7687:7687 \
        --volume=/var/local/neo4j/data:/data \
        neo4j

Se connecter une première fois à l'IHM ( http://localhost:7474/ ) pour remplir le mot de passe ('neo4j' par défaut, 'azerty' dans mon cas)

Installation du driver

    npm install neo4j-driver

Lancer ensuite l'import des vues via la commande 

    node vue_to_db.js

(Il faut potentiellement changer les credentials Neo4j dans ce fichier)


## Faire joujou avec les données importées

Ça se passe là : http://localhost:7474/browser/

### Quelques exemples de requêtes

Les monstres à moins de 3 cav :

    MATCH p=()-[r:VOIT]->(m:Monstre) WHERE r.distance <= 3 RETURN p LIMIT 50

Les nivals 44+ à moins de 20 cav :

    MATCH p=()-[r:VOIT]->(m:Monstre) WHERE m.nival >= 44 AND r.distance <= 20 RETURN p LIMIT 50

Les monstres de la famille 'Insecte' de nival 40+-1 :

    MATCH p=()-[r:VOIT]->(m:Monstre) WHERE m.family = 'Insecte' AND m.nival >= 39 AND m.nival <=41 RETURN p LIMIT 50
