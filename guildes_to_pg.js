const http = require('http');
const { Client, Pool } = require('pg');

// let rawUrl = `http://ftp.mountyhall.com/Public_Guildes.txt`;
let rawUrl = `http://127.0.0.1:3002/?file=Public_Guildes.txt`;
console.log(`Appel de l'URL ${rawUrl}...`);

let someRequest = http.request(rawUrl, function (response) {
    let data = '';
    response.on('data', function (chunk) {
        data += chunk;
    });

    response.on('end', function () {

        let rawLines = data.split('\n');
        let guildes = [];

        // Guilde des non guildés
        guildes.push({id: 1, name:'-'});

        for (let line of rawLines) {

            let cells = line.split(';');

            // ** Public_Trolls2.txt **
            // Id ; Nom ; Taille ;

            if (cells && cells.length >= 4) {
                let guilde = {
                    id: cells[0],
                    name: cells[1]
                };

                // if (troll.guildeId === 1900) {
                //     console.log(troll);
                // }

                guildes.push(guilde);
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

        // DROP TABLE guilde;
        // CREATE TABLE guilde (
        //     id INTEGER PRIMARY KEY,
        //     nom TEXT NOT NULL
        // );

        console.log(`Insertion de ${guildes.length} guildes ...`);
        for (let guilde of guildes) {

          // console.log("insert troll " + troll.id);
          pool.connect((err, client, release) => {
            if (err) {
              return console.error('Error acquiring client', err.stack)
            }
            let query = 'INSERT INTO guilde (id, nom) values ($1, $2) ON CONFLICT (id) DO UPDATE SET nom=EXCLUDED.nom;';
            let values = [guilde.id, guilde.name];
            client.query(query, values, (err, result) => {
              release();
              if (err) {
                return console.error('Error executing query', err.stack);
              }
            });
          });
        }

    });

});
someRequest.end();
