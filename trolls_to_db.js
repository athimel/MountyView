const http = require('http');
const neo4j = require('neo4j-driver').v1;

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

                if (troll.guildeId === 1900) {
                    console.log(troll);
                }

                trolls.push(troll);
            } else {
                console.error("Skoi c'te ligne ?", line);
            }
        }

        const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "azerty"));
        const session = driver.session();

        // CREATE CONSTRAINT ON (t:Troll) ASSERT t.id IS UNIQUE;
        // CREATE CONSTRAINT ON (m:Monstre) ASSERT m.id IS UNIQUE;

        const resultPromise = session.writeTransaction(tx => {

            console.log(`Insertion de ${trolls.length} trolls ...`);
            for (let troll of trolls) {

                let propsSet = "{ " +
                    "name: $name, " +
                    "race: $race, " +
                    "nival: $nival, " +
                    "guildeId: $guildeId, " +
                    "blason: $blason" +
                    "}";
                tx.run(
                    'MERGE (m:Troll {id: $id})' +
                    ' ON CREATE SET m+= ' + propsSet +
                    ' ON MATCH  SET m+= ' + propsSet,
                    troll);
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

