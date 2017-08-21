const http = require('http');
const { Client, Pool } = require('pg');

// let rawUrl = `http://ftp.mountyhall.com/Public_Trolls2.txt`;
let rawUrl = `http://127.0.0.1:3002/?file=Public_Trolls2.txt`;
console.log(`Appel de l'URL ${rawUrl}...`);

let someRequest = http.request(rawUrl, function (response) {
    let data = '';
    response.on('data', function (chunk) {
        data += chunk;
    });

    response.on('end', function () {

        let rawLines = data.split('\n');
        let trolls = [];

        for (let line of rawLines) {

            let cells = line.split(';');

            // ** Public_Trolls2.txt **
            // Id ; Nom ; Race ; Niveau ; Nb de Kills ; Nb de Morts ; Nb de Mouches ; Id Guilde ; Rang Guilde ; Etat Troll ; Intangible (*); PNJ (*) ; Ami de MH (*) ; Date d'Inscription ; Blason

            if (cells && cells.length >= 14) {
                let troll = {
                    id: cells[0],
                    name: cells[1],
                    race: cells[2],
                    nival: parseInt(cells[3]),
                    guildeId: parseInt(cells[7]),
                    blason: cells[14] || ''
                };

                // if (troll.guildeId === 1900) {
                //     console.log(troll);
                // }

                trolls.push(troll);
            } else {
                console.error("Skoi c'te ligne ?", line);
            }
        }

        const pool = new Pool({
          user: 'postgres',
          host: 'localhost',
          database: 'postgres',
          password: 'perso',
          port: 9999,
        });

        // DROP TABLE troll;
        // CREATE TABLE troll
        // (
        //     id integer NOT NULL PRIMARY KEY,
        //     nom text NOT NULL,
        //     race text  NOT NULL,
        //     nival integer NOT NULL,
        //     password text,
        //     guilde integer,
        //     blason text
        // );

        console.log(`Insertion de ${trolls.length} trolls ...`);
        for (let troll of trolls) {

          // console.log("insert troll " + troll.id);
          pool.connect((err, client, release) => {
            if (err) {
              return console.error('Error acquiring client', err.stack)
            }
            let query = 'INSERT INTO troll (id, nom, race, nival, guilde, blason) values ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET nom=EXCLUDED.nom, race=EXCLUDED.race, nival=EXCLUDED.nival, guilde=EXCLUDED.guilde, blason=EXCLUDED.blason;';
            let values = [troll.id, troll.name, troll.race, troll.nival, troll.guildeId, troll.blason];
            client.query(query, values, (err, result) => {
              release();
              if (err) {
                return console.error('Error executing query', err.stack);
              }
              // console.log(result.rows)
            });
          });
        }

    });

});
someRequest.end();
