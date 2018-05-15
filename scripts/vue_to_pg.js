const http = require('http');
const { Client, Pool } = require('pg');

let computeDistance = function(pos1, pos2) {

    let xDistance = Math.abs(pos1.x - pos2.x);
    let yDistance = Math.abs(pos1.y - pos2.y);
    let nDistance = Math.abs(pos1.n - pos2.n);

    let result = {
        horizontalDistance: Math.max(xDistance, yDistance),
        verticalDistance: nDistance
    };
    result.distance = Math.max(result.horizontalDistance, result.verticalDistance);

    return result;

};

let pushViewToDb = function(trollId) {

    let rawUrl = `http://127.0.0.1:3001/?id=${trollId}`;
    console.log(`Appel de l'URL ${rawUrl}...`);

    let someRequest = http.request(rawUrl, function (response) {
        let data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {

            let json = JSON.parse(data);

            const pool = new Pool({
              user: 'postgres',
              host: 'localhost',
              database: 'postgres',
              password: 'toto',
              port: 15432,
            });

            let parser = require('./monsters.js');

//      id integer PRIMARY KEY,
//      nom text NOT NULL,
//      posX integer,
//      posY integer,
//      posN integer,
//      baseName text,
//      family text,
//      baseNival integer,
//      template text,
//      templateBonus integer,
//      age integer,
//      ageBonus integer,
//      nival integer


            console.log(`Insertion de ${json.monstres.length} monstres ...`);
            for (let monstre of json.monstres) {

                let enriched = parser.parseMonster(monstre);
                enriched.family = enriched.family || "?";
                enriched.baseNival = enriched.baseNival || -1;

                // console.log("insert troll " + troll.id);
                pool.connect((err, client, release) => {
                  if (err) {
                    return console.error('Error acquiring client', err.stack)
                  }
                  let query = 'INSERT INTO monster ' +
                              '(id, nom, pos_x, pos_y, pos_n, base_name, family, base_nival, template, template_bonus, age, age_bonus, nival) ' +
                              'values ' +
                              '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ' +
                              'ON CONFLICT (id) ' +
                              'DO UPDATE SET nom=EXCLUDED.nom, pos_x=EXCLUDED.pos_x, pos_y=EXCLUDED.pos_y, pos_n=EXCLUDED.pos_n, base_name=EXCLUDED.base_name, family=EXCLUDED.family, base_nival=EXCLUDED.base_nival, template=EXCLUDED.template, template_bonus=EXCLUDED.template_bonus, age=EXCLUDED.age, age_bonus=EXCLUDED.age_bonus, nival=EXCLUDED.nival;';
                  let values = [enriched.id, enriched.name, enriched.pos.x, enriched.pos.y, enriched.pos.n, enriched.baseName, enriched.family, "[" + enriched.baseNival + "," +enriched.baseNival + "]", enriched.template, enriched.templateBonus, enriched.age, enriched.ageBonus, "[" + enriched.nival + "," +enriched.nival + "]"];
                  console.log('INSERT INTO monster: ' + enriched.id + '/' + enriched.name);
                  client.query(query, values, (err, result) => {
                    release();
                    if (err) {
                      return console.error('Error executing query', err.stack);
                    }
                    // console.log(result.rows)
                  });


                  let d = computeDistance(json.origine.pos, enriched.pos);

//    id BIGSERIAL PRIMARY KEY REFERENCES update(id),
//    monstre integer REFERENCES monster(id),
//    pos_x integer NOT NULL,
//    pos_y integer NOT NULL,
//    pos_n integer NOT NULL,
//    distance integer NOT NULL

//                  let query2 = 'INSERT INTO voit (id, monstre, pos_x, pos_y, pos_n, distance) values ($1, $2, $3, $4, $5, $6) ON CONFLICT (id, monstre) DO UPDATE SET pos_x=EXCLUDED.pos_x, pos_y=EXCLUDED.pos_y, pos_n=EXCLUDED.pos_n, distance=EXCLUDED.distance;';
//                  let values2 = [1, enriched.id, enriched.pos.x, enriched.pos.y, enriched.pos.n, d.distance];
//                  console.log('INSERT INTO monster: ' + enriched.id + '/' + enriched.name);
//                  client.query(query2, values2, (err, result) => {
//                    release();
//                    if (err) {
//                      return console.error('Error executing query', err.stack);
//                    }
//                    // console.log(result.rows)
//                  });

                });

            }

//            console.log(`Insertion de ${json.trolls.length} trolls ...`);
//            for (let troll of json.trolls) {
//
//                let propsSet = "{ " +
//                    "posX: $pos.x, " +
//                    "posY: $pos.y, " +
//                    "posN: $pos.n " +
//                    "}";
//                tx.run(
//                    'MERGE (m:Troll {id: $id})' +
//                    ' ON CREATE SET m+= ' + propsSet +
//                    ' ON MATCH  SET m+= ' + propsSet,
//                    troll);
//
//                let estVuId = '' + troll.id;
//                if (estVuId !== trollId) {
//
//                    let d = computeDistance(json.origine.pos, troll.pos);
//
//                    tx.run('MATCH (voit:Troll {id: $voitId}), (estVu:Troll {id: $estVuId}) ' +
//                        'MERGE (voit)-[r:VOIT]->(estVu) ' +
//                        ' ON CREATE SET r+= {quand: $date, posX: $posX, posY: $posY, posN: $posN, distance: $distance}' +
//                        ' ON MATCH  SET r+= {quand: $date, posX: $posX, posY: $posY, posN: $posN, distance: $distance}',
//                        {
//                            estVuId: estVuId,
//                            voitId: trollId,
//                            date: date,
//                            posX: troll.pos.x,
//                            posY: troll.pos.y,
//                            posN: troll.pos.n,
//                            distance: d.distance
//                        });
//                }
//            }

        });

    });
    someRequest.end();

};

pushViewToDb('104259');
//pushViewToDb('88222');
//pushViewToDb('50362');


