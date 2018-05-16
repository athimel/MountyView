# Scripts JS d'émulation du contenu MH

## Émulation de SP_Vue2.php

    node vue_mock.js

Ça démarre un serveur HTTP sur le port 3000 qui renvoi le contenu des vues contenues dans le dossier "vues"

Pour tester, se rendre sur http://127.0.0.1:3000/?id=104259
(fonctionne également avec 88222 et 50362)

## Émulation du FTP MH

    node public_mock.js

Ça démarre un serveur HTTP sur le port 3002 qui renvoi le contenu du fichier public contenu dans le dossier "public"

Pour tester, se rendre sur http://127.0.0.1:3002/?file=Public_Guildes.txt


## Conversion d'une vue issue de SP_Vue2.php en JSON

    node vue_json.js

Ça démarre un serveur HTTP sur le port 3001 qui va lire les informations sur le port 3000 (données brutes) et qui renvoi le contenu des vues au format JSON

Pour tester, se rendre sur http://127.0.0.1:3001/?id=104259
(fonctionne également avec 88222 et 50362)

