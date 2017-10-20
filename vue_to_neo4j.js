const http = require('http');
const neo4j = require('neo4j-driver').v1;

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

            const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "azerty"));
            const session = driver.session();

            // CREATE CONSTRAINT ON (t:Troll) ASSERT t.id IS UNIQUE;
            // CREATE CONSTRAINT ON (m:Monstre) ASSERT m.id IS UNIQUE;

            const resultPromise = session.writeTransaction(tx => {

                let parser = require('./monsters.js');

                let date = Date.now();
                tx.run(
                    'MERGE (t:Troll {id: $id})' +
                    ' ON CREATE SET t+= {date:timestamp(), posX: $pos.x, posY: $pos.y, posN: $pos.n} ' +
                    ' ON MATCH  SET t+= {date:timestamp(), posX: $pos.x, posY: $pos.y, posN: $pos.n} ',
                    {id: trollId, pos: json.origine.pos, date: date});

                console.log(`Insertion de ${json.monstres.length} monstres ...`);
                for (let monstre of json.monstres) {

                    let enriched = parser.parseMonster(monstre);
                    enriched.family = enriched.family || "?";
                    enriched.baseNival = enriched.baseNival || -1;

                    let propsSet = "{ " +
                        "name: $name, " +
                        "posX: $pos.x, " +
                        "posY: $pos.y, " +
                        "posN: $pos.n, " +
                        "baseName: $baseName, " +
                        "family: $family, " +
                        "baseNival: $baseNival, " +
                        "template: $template, " +
                        "templateBonus: $templateBonus, " +
                        "age: $age, " +
                        "ageBonus: $ageBonus, " +
                        "nival: $nival " +
                        "}";
                    tx.run(
                        'MERGE (m:Monstre {id: $id})' +
                        ' ON CREATE SET m+= ' + propsSet +
                        ' ON MATCH  SET m+= ' + propsSet,
                        enriched);

                    let d = computeDistance(json.origine.pos, enriched.pos);

                    tx.run('MATCH (m:Monstre {id: $monstreId}), (t:Troll {id: $trollId}) ' +
                        'MERGE (t)-[r:VOIT]->(m) ' +
                        ' ON CREATE SET r+= {quand: $date, posX: $posX, posY: $posY, posN: $posN, distance: $distance}' +
                        ' ON MATCH  SET r+= {quand: $date, posX: $posX, posY: $posY, posN: $posN, distance: $distance}',
                        {
                            monstreId: monstre.id,
                            trollId: trollId,
                            date: date,
                            posX: monstre.pos.x,
                            posY: monstre.pos.y,
                            posN: monstre.pos.n,
                            distance: d.distance
                        });
                }

                console.log(`Insertion de ${json.trolls.length} trolls ...`);
                for (let troll of json.trolls) {

                    let propsSet = "{ " +
                        "posX: $pos.x, " +
                        "posY: $pos.y, " +
                        "posN: $pos.n " +
                        "}";
                    tx.run(
                        'MERGE (m:Troll {id: $id})' +
                        ' ON CREATE SET m+= ' + propsSet +
                        ' ON MATCH  SET m+= ' + propsSet,
                        troll);

                    let estVuId = '' + troll.id;
                    if (estVuId !== trollId) {

                        let d = computeDistance(json.origine.pos, troll.pos);

                        tx.run('MATCH (voit:Troll {id: $voitId}), (estVu:Troll {id: $estVuId}) ' +
                            'MERGE (voit)-[r:VOIT]->(estVu) ' +
                            ' ON CREATE SET r+= {quand: $date, posX: $posX, posY: $posY, posN: $posN, distance: $distance}' +
                            ' ON MATCH  SET r+= {quand: $date, posX: $posX, posY: $posY, posN: $posN, distance: $distance}',
                            {
                                estVuId: estVuId,
                                voitId: trollId,
                                date: date,
                                posX: troll.pos.x,
                                posY: troll.pos.y,
                                posN: troll.pos.n,
                                distance: d.distance
                            });
                    }
                }
            });

            resultPromise.then(result => {
                session.close();

                // on application exit:
                driver.close();
            });


        });

    });
    someRequest.end();

};

pushViewToDb('104259');
pushViewToDb('88222');
pushViewToDb('50362');


