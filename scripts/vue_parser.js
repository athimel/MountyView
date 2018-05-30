const http = require('http');

let getPart = function(rawLines, partName) {
    console.log("Lecture de la partie " + partName);
    let beginMet = false;
    let endMet = false;
    let result = [];
    for (let line of rawLines) {
        if (beginMet) {
            if (line === `#FIN ${partName}`) {
                endMet = true;
                beginMet = false;
            } else {
                result.push(line);
            }
        } else if (line === `#DEBUT ${partName}`) {
            beginMet = true;
            endMet = false;
        }
    }
    return result;
};

let splitParts = function (raw) {

    let rawLines = raw.split('\n');

    let monstres = getPart(rawLines, "MONSTRES");
    let trolls = getPart(rawLines, "TROLLS");
    let tresors = getPart(rawLines, "TRESORS");
    let lieux = getPart(rawLines, "LIEUX");
    let champignons = getPart(rawLines, "CHAMPIGNONS");
    let origine = getPart(rawLines, "ORIGINE");

    let result = {
        monstres: monstres,
        trolls: trolls,
        tresors: tresors,
        lieux: lieux,
        champignons: champignons,
        origine: origine
    };

    // console.log(`splitParts : `, result);
    return result;
};

let toPos = function(cells, fromIndex) {
    let result = {
        x: cells[fromIndex],
        y: cells[fromIndex+1],
        n: cells[fromIndex+2]
    };
    return result;
};

let toMonster = function(line) {
    let cells = line.split(';');
    let result = {
        id: cells[0],
        name: cells[1],
        pos: toPos(cells, 2)
    };
    return result;
};

let toMonsterPromise = function(line) {
    return new Promise(function (resolve, reject) {
        let encoded = encodeURIComponent(line);
//        let rawUrl = `http://localhost:8080/mountyMonsters/v1/monsters/fromSpVue2Row?row=${encoded}`;
        let rawUrl = `http://mounty-fetch.zoumbox.org/v1/monsters/fromSpVue2Row?row=${encoded}`;
        let someRequest = http.request(rawUrl, function(response) {
            let data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                let jsd = JSON.parse(data);
                resolve(jsd);
            });
        });
        someRequest.end();
    });
};

let toMonstersPromise = function(lines) {
    return new Promise(function (resolve, reject) {
//        let rawUrl = `http://localhost:8080/mountyMonsters/v1/parse/fromSpVue2Rows?`;
        let rawUrl = `http://mounty-fetch.zoumbox.org/v1/monsters/fromSpVue2Rows?`;
        for (let line of lines) {
            let encoded = encodeURIComponent(line);
            rawUrl += `&row=${encoded}`;
        }

console.log(rawUrl);
        let someRequest = http.request(rawUrl, function(response) {
            let data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                let jsd = JSON.parse(data);
                resolve(jsd);
            });
        });
        someRequest.end();
    });
};

let toTroll = function(line) {
    let cells = line.split(';');
    let result = {
        id: cells[0],
        pos: toPos(cells, 1)
    };
    return result;
};

let toTrollsPromise = function(lines) {
    return new Promise(function (resolve, reject) {
//        let rawUrl = `http://localhost:8080/mountyMonsters/v1/parse/fromSpVue2Rows?`;
        let rawUrl = `http://mounty-fetch.zoumbox.org/v1/trolls/fromSpVue2Rows?`;
        for (let line of lines) {
            let encoded = encodeURIComponent(line);
            rawUrl += `&row=${encoded}`;
        }

console.log(rawUrl);
        let someRequest = http.request(rawUrl, function(response) {
            let data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                let jsd = JSON.parse(data);
                resolve(jsd);
            });
        });
        someRequest.end();
    });
};

let toTresor = function(line) {
    let cells = line.split(';');
    let result = {
        id: cells[0],
        name: cells[1],
        pos: toPos(cells, 2)
    };
    return result;
};

let toLieu = function(line) {
    let cells = line.split(';');
    let result = {
        id: cells[0],
        name: cells[1],
        pos: toPos(cells, 2)
    };
    return result;
};

let toChampignon = function(line) {
    let cells = line.split(';');
    let result = {
        id: cells[0],
        name: cells[1],
        pos: toPos(cells, 2)
    };
    return result;
};

let toOrigin = function(line) {
    let cells = line.split(';');
    let result = {
        scope: cells[0],
        pos: toPos(cells, 1)
    };
    return result;
};

module.exports.parseVue = function (raw) {
    let splitted = splitParts(raw);

    let result = {
        monstres: [],
        trolls: [],
        tresors: [],
        lieux: [],
        champignons: [],
        origine: toOrigin(splitted.origine[0])
    };

    Array.prototype.chunk = function ( n ) {
        if ( !this.length ) {
            return [];
        }
        return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
    };

    let monstersChunksPromises = [];
    let monstersChunks = splitted.monstres.chunk(30);
    console.log(splitted.monstres.length + " monsters -> " + monstersChunks.length + " chunks");
    for (let chunk of monstersChunks) {
        let promise = toMonstersPromise(chunk);
        monstersChunksPromises.push(promise);
    }

    let trollsChunksPromises = [];
    let trollsChunks = splitted.trolls.chunk(130); // Lines are really smaller than monsters, we can send more at a time
    console.log(splitted.trolls.length + " trolls -> " + trollsChunks.length + " chunks");
    for (let chunk of trollsChunks) {
        let promise = toTrollsPromise(chunk);
        trollsChunksPromises.push(promise);
    }

    for (let elem of splitted.tresors) {
        result.tresors.push(toTresor(elem));
    }

    for (let elem of splitted.lieux) {
        result.lieux.push(toLieu(elem));
    }

    for (let elem of splitted.champignons) {
        result.champignons.push(toChampignon(elem));
    }

    return new Promise(function (resolve, reject) {
        Promise.all(monstersChunksPromises).then(function(chunks) {
            for (let chunk of chunks) {
                for (let m of chunk) {
                    result.monstres.push(m);
                }
            }
            console.log(chunks.length + " chunks received containing " + result.monstres.length + " monsters ");

            Promise.all(trollsChunksPromises).then(function(chunks) {
                for (let chunk of chunks) {
                    for (let t of chunk) {
                        result.trolls.push(t);
                    }
                }
                console.log(chunks.length + " chunks received containing " + result.trolls.length + " trolls ");
                resolve(result);
            });

        });
    });
};
