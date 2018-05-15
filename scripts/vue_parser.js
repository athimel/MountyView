
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

let toTroll = function(line) {
    let cells = line.split(';');
    let result = {
        id: cells[0],
        pos: toPos(cells, 1)
    };
    return result;
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

    // for (let key of Object.keys(splitted)) {
    //     console.log(splitted[key].length + " " + key);
    // }

    let result = {
        monstres: [],
        trolls: [],
        tresors: [],
        lieux: [],
        champignons: [],
        origine: toOrigin(splitted.origine[0])
    };

    for (let elem of splitted.monstres) {
        result.monstres.push(toMonster(elem));
    }

    for (let elem of splitted.trolls) {
        result.trolls.push(toTroll(elem));
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

    // console.log(result.monstres);
    // console.log(result.trolls);

    return result;
};
