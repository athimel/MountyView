let monsters = {};

// Nivals des monstres, catégorisés par famille
monsters.families = {
    Animal: {
        "Chauve-Souris":3,
        "Chauve-Souris Géante":4,
        "Cheval à Dents de Sabre":23,
        Dindon:1,
        "Dindon du Chaos":1,
        "Geck'oo":15,
        "Geck'oo majestueux":40,
        Glouton:20,
        Gnu:1,
        "Gnu Sauvage":1,
        "Gnu Domestique":1,
        Gowap:1,
        "Gowap Apprivoisé":1,
        "Gowap Sauvage":1,
        "Lapin Blanc":1,
        "Poisson Rouge":0,
        "Rat":1,
        "Rat Géant":2,
        Sagouin:3,
        "Tubercule Tueur":14
    },
    Insecte: {
        Ankheg: 10,
        "Anoploure Purpurin":36,
        "Aragnarok du Chaos":16,
        "Araignée":1,
        "Araignée Géante":2,
        Coccicruelle:22,
        "Essaim Cratérien":30,
        "Essaim Sanguinaire":25,
        Foudroyeur:38,
        Labeilleux:26,
        "Limace Géante":10,
        "Mante Fulcreuse":30,
        "Mille-Pattes":13,
        "Mille-Pattes Géant":14,
        "Nuage d'Insectes":7,
        "Nuée de Vermine":13,
        Pititabeille:0,
        "Scarabée":3,
        "Scarabée Géant":4,
        "Scorpion Géant":10,
        Strige:2,
        "Thri-kreen":10
    },
    "Mort-Vivant": {
        "Ame-en-peine":8,
        Banshee:16,
        Capitan:35,
        Croquemitaine:6,
        Ectoplasme:18,
        Fantôme:24,
        Goule:4,
        Liche:50,
        Mohrg:35,
        Momie:4,
        "Nâ-Hàniym-Hééé":0,
        Nécrochore:37,
        Nécromant:39,
        Nécrophage:8,
        Ombre:2,
        Spectre:14,
        Squelette:1,
        Vampire:29,
        Zombie:2
    },
    Monstre: {
        "Amibe":8,
        "Amibe Géante":9,
        "Anaconda des Catacombes":8,
        Basilisk:11,
        Behir:14,
        Beholder:50,
        Bondin:9,
        "Bouj'Dla":19,
        "Bouj'Dla Placide":37,
        Bulette:19,
        Carnosaure:25,
        Chimère:13,
        Chonchon:24,
        Cockatrice:5,
        Crasc:10,
        "Crasc Médius":17,
        "Crasc Maexus":29,
        "Crasc parasitus":14,
        "Cube Gélatineux":32,
        Djinn:29,
        Effrit:27,
        "Esprit-Follet":16,
        Familier:1,
        "Feu Follet":20,
        Fungus:8,
        "Fungus Géant":9,
        "Fungus Violet":4,
        Gargouille:3,
        Gorgone:11,
        Grouilleux:4,
        Grylle:31,
        Harpie:4,
        Hydre:50,
        "Lézard":4,
        "Lézard Géant":5,
        Manticore:9,
        Mimique:6,
        "Monstre Rouilleur":3,
        "Mouch'oo":14,
        "Mouch'oo Domestique":14,
        "Mouch'oo Sauvage":14,
        "Mouch'oo Majestueux":33,
        "Mouch'oo Majestueux Sauvage":33,
        Naga:10,
        "Ombre de Roches":13,
        Phoenix:32,
        "Plante Carnivore":4,
        Slaad:5,
        "Tertre Errant":20,
        Trancheur:35,
        Tutoki:4,
        "Ver Carnivore":11,
        "Ver Carnivore Géant":12,
        Vouivre:33,
        Worg:5
    },
    Démon: {
        "Abishaii Bleu":19,
        "Abishaii Noir":10,
        "Abishaii Rouge":23,
        "Abishaii Vert":15,
        Balrog:50,
        Barghest:36,
        Behemoth:34,
        "Chevalier du Chaos":20,
        Daemonite:27,
        Diablotin:5,
        "Elementaire d'Air":23,
        "Elémentaire d'Air":23,
        "Elementaire d'Eau":17,
        "Elémentaire d'Eau":17,
        "Elementaire de Feu":21,
        "Elémentaire de Feu":21,
        "Elementaire de Terre":21,
        "Elémentaire de Terre":21,
        "Elementaire du Chaos":26,
        "Elémentaire du Chaos":26,
        "Elementaire Magmatique":0,
        "Elémentaire Magmatique":0,
        Erinyes:7,
        "Grosse Erinyes":8,
        Fumeux:22,
        Gritche:39,
        Hellrot:18,
        Incube:13,
        Marilith:33,
        "Molosse Satanique":8,
        "Palefroi Infernal":29,
        "Pseudo-Dragon":5,
        Shai:28,
        Succube:13,
        Xorn:14
    },
    Humanoïde: {
        Ashashin:35,
        Boggart:3,
        Caillouteux:1,
        "Champi-Glouton":3,
        Ettin:8,
        "Flagelleur Mental":33,
        Furgolin:10,
        "Géant de Pierre":13,
        "Géant des Gouffres":22,
        Gnoll:5,
        Goblin:4,
        Goblours:4,
        "Golem de cuir":1,
        "Golem de mithril":1,
        "Golem de métal":1,
        "Golem de papier":1,
        "Golem d'Argile":15,
        "Golem de Chair":8,
        "Golem de Fer":31,
        "Golem de Pierre":23,
        Gremlins:3,
        "Homme-Lézard":4,
        Hurleur:8,
        Kobold:2,
        "Loup-Garou":8,
        Lutin:4,
        Méduse:6,
        Mégacéphale:38,
        Minotaure:7,
        Ogre:7,
        Orque:3,
        "Ours-Garou":18,
        Raquettou:1,
        "Rat-Garou":3,
        Rocketeux:5,
        Sorcière:17,
        Sphinx:30,
        "Tigre-Garou":12,
        Titan:26,
        "Veskan du Chaos":14,
        "Veskan Du Chaos":14,
        Yéti:8,
        "Yuan-ti":15
    }
};

// Templates et bonus par template
monsters.templates = {
    Agressif:1,
    Agressive:1,
    Alchimiste:2,
    Alpha:11,
    Archaïque:-1,
    Archiatre:2,
    Attentionné:2,
    Attentionnée:2,
    Barbare:1,
    Berserker:2,
    Berserkere:2,
    Champion:4,
    Championne:4,
    Cogneur:2,
    Cogneuse:2,
    Colossal:7,
    Colossale:7,
    Coriace:1,
    Corrompu:1,
    Corrompue:1,
    Cracheur:2,
    Cracheuse:2,
    "de Premier Cercle":-1,
    "de Second Cercle":0,
    "de Troisième Cercle":2,
    "de Quatrième Cercle":4,
    "de Cinquième Cercle":5,
    "des Abysses":3,
    Effrayé:-1,
    Effrayée:-1,
    Enragé:3,
    Enragée:3,
    Esculape:2,
    Ethéré:3,
    Ethérée:3,
    Fanatique:2,
    Fou:1,
    Folle:1,
    Fouisseur:0,
    Fouisseuse:0,
    Frénétique:3,
    Frondeur:2,
    Frondeuse:2,
    Fustigateur:2,
    Fustigatrice:2,
    Gardien:20,
    Gardienne:20,
    Gargantuesque:3,
    Gigantesque:1,
    "Grand Frondeur":4,
    "Grande Frondeuse":4,
    Gros:0,
    Grosse:0,
    Guérisseur:2,
    Guérisseuse:2,
    Guerrier:1,
    Guerrière:1,
    Héros:5,
    Homochrome:2,
    Homomorphe:3,
    Implacable:3,
    Invocateur:5,
    Invocatrice:5,
    Lobotomisateur:2,
    Lobotomisatrice:2,
    Maitre:8,
    Maître:8,
    Maîtresse:8,
    Malade:-1,
    Médicastre:2,
    Mentat:2,
    Morticole:2,
    Mutant:2,
    Mutante:2,
    Nécromant:5,
    Nécromante:5,
    Ouvrier:0,
    Ouvrière:0,
    Parasitus:2,
    Paysan:-1,
    Paysanne:-1,
    Petit:-1,
    Petite:-1,
    Planqué:1,
    Planquée:1,
    Prince:8,
    Princesse:8,
    Psychophage:2,
    Reine:11,
    Ronfleur:2,
    Ronfleuse:2,
    Scout:2,
    Shaman:0,
    Soldat:2,
    Sorcier:0,
    Sorcière:0,
    Spectral:3,
    Spectrale:3,
    Strident:3,
    Stridente:3,
    Traqueur:1,
    Traqueuse:1,
    Voleur:2,
    Voleuse:2,
    Vorace:1
};

// Âge des monstres et bonus par âge (catégorisé par famille)
monsters.ages = {
    Animal: {
        Bébé:0,
        Enfançon:1,
        Jeune:2,
        Adulte:3,
        Mature:4,
        "Chef de Harde":5,
        "Chef de harde":5,
        Ancien:6,
        Ancienne:6,
        Ancêtre:7
    },
    Démon: {
        Initial:0,
        Initiale:0,
        Novice:1,
        Mineur:2,
        Mineure:2,
        Favori:3,
        Favorite:3,
        Majeur:4,
        Majeure:4,
        Supérieur:5,
        Supérieure:5,
        Suprême:6,
        Ultime:7
    },
    Humanoïde: {
        Nouveau:0,
        Nouvelle:0,
        Jeune:1,
        Adulte:2,
        Vétéran:3,
        Briscard:4,
        Briscarde:4,
        Doyen:5,
        Doyenne:5,
        Légendaire:6,
        Mythique:7
    },
    Insecte: {
        Larve:0,
        Immature:1,
        Juvénile:2,
        Imago:3,
        Développé:4,
        Développée:4,
        Mûr:5,
        Mûre:5,
        Accompli:6,
        Accomplie:6,
        Achevé:7,
        Achevée:7
    },
    Monstre: {
        Nouveau:0,
        Nouvelle:0,
        Jeune:1,
        Adulte:2,
        Vétéran:3,
        Briscard:4,
        Briscarde:4,
        Doyen:5,
        Doyenne:5,
        Légendaire:6,
        Mythique:7
    },
    "Mort-Vivant": {
        Naissant:0,
        Naissante:0,
        Récent:1,
        Récente:1,
        Ancien:2,
        Ancienne:2,
        Vénérable:3,
        Séculaire:4,
        Antique:5,
        Ancestral:6,
        Ancestrale:6,
        Antédiluvien:7,
        Antédiluvienne:7
    }
};



let extractAge = function(monster) {
    var name = monster.name.trim();
    var index = name.indexOf("[");
    var endIndex = name.indexOf("]", index);
    monster.age = name.substr(index + 1, endIndex - index - 1).trim();
    monster.baseName = name.substr(0, index).trim();
};

let extractTemplate = function(monster) {
    delete monster.template;

    var name = monster.baseName.trim() + " ";
    if (name.substr(0, 6) == "Archi-") {
        monster.template = name.substr(6).trim();
        monster.baseName = name.substr(6).trim();
    } else {
        var templatesNames = Object.keys(monsters.templates);
        for (var i = 0; i < templatesNames.length; i++) {
            var template = templatesNames[i];
            var index = name.indexOf(template + " "); // +" " Pour s'assurer que le mot est complet
            if (index >= 0) {
                monster.template = template;
                monster.baseName = (name.substr(0, index) + name.substr(index + monster.template.length)).trim();

                // Cas particulier du Nécromant/Sorcière (template et nom de monstre)
                if (monster.baseName.length == 0) {
                    delete monster.template;
                    monster.baseName = name.trim();
                }

                // Car particulier de la "Voleuse Sorcière" (template avant le nom)
                if ((monster.template == "Sorcière" || monster.template == "Nécromant") && monsters.templates[monster.baseName]) {
                    var tmp = monster.baseName;
                    monster.baseName = monster.template;
                    monster.template = tmp;
                }

                // Cas particulier du Frondeur vs Grand Frondeur
                if (monster.template == "Frondeur" && monster.baseName.substr(0, 5) == "Grand") {
                    monster.template = "Grand Frondeur";
                    monster.baseName = name.substr(14).trim();
                }

                // Cas particulier de la Frondeuse vs Grande Frondeuse
                if (monster.template == "Frondeuse" && monster.baseName.substr(0, 6) == "Grande") {
                    monster.template = "Grande Frondeuse";
                    monster.baseName = name.substr(16).trim();
                }
                break;
            }
        }
    }
};

let extractFamilyAndBaseNival = function(monster) {
    delete monster.family;
    delete monster.baseNival;
    delete monster.nival;

    var name = monster.baseName.trim();

    var familyNames = Object.keys(monsters.families);
    for (var i = 0; i < familyNames.length; i++) {
        var family = familyNames[i];
        if (monsters.families[family][name] !== undefined) {
            monster.family = family;
            monster.baseNival = monsters.families[family][name];
            break;
        }
    }

    if (!monster.family || monster.baseNival === undefined) {
        console.error("############################");
        console.error("Pas de famille ou de nival ?");
        console.error("monster.baseName : " + monster.baseName);
        console.error("name : " + name);
        console.error("monster.family : " + monster.family);
        if (monster.family) {
            console.error("monsters.families[monster.family] : ", monsters.families[monster.family]);
            if (monsters.families[monster.family]) {
                console.error("monsters.families[monster.family][name] : ", monsters.families[monster.family][name]);
            }
        }
    }
};

let computeMonsterDetails = function(monster) {

    delete monster.templateBonus;
    delete monster.ageBonus;

    extractAge(monster);
    extractTemplate(monster);
    extractFamilyAndBaseNival(monster);

    let ageBonus;
    if (monster.family && monster.age) {
        ageBonus = monsters.ages[monster.family][monster.age];
    }
    monster.ageBonus = ageBonus || 0;

    monster.templateBonus = monsters.templates[monster.template] || 0;
    monster.template = monster.template || null;

    monster.nival = monster.baseNival + monster.ageBonus + monster.templateBonus;

    if (!monster.baseName) {
        console.error("Name de base absent", monster);
    }

    if (!monster.family) {
        console.error("Famille absente", monster);
    }

    if (monster.baseNival === undefined) {
        console.error("Niveau de base absent", monster);
    }

    if (!monster.age) {
        console.error("Âge absent", monster);
    }

    if (monster.nival === undefined || isNaN(monster.nival)) {
        console.error("Nival non calculé", monster);
    }

    if (monster.template && monsters.templates[monster.template] === undefined) {
        console.error("Template sans bonus", monster);
    }
};

let clone = function (obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

// module.exports.monstres = monsters;

module.exports.parseMonster = function(raw) {
    let result = clone(raw);
    computeMonsterDetails(result);
    return result;
};
