DROP TABLE voit;
DROP TABLE monster;
DROP TABLE grants;
DROP TABLE update;
DROP TABLE troll;
DROP TABLE users;
DROP TABLE guilde;

--DROP TABLE guilde;
CREATE TABLE guilde (
    id integer PRIMARY KEY,
    nom text NOT NULL
);

CREATE TYPE races AS ENUM('Kastar', 'Durakuir', 'Skrim', 'Tomawak', 'Darkling', 'Nkrwapu');

--DROP TABLE troll;
CREATE TABLE troll (
    id integer PRIMARY KEY,
    nom text NOT NULL,
    race races NOT NULL,
    nival integer NOT NULL,
    password text,
    guilde integer REFERENCES guilde(id),
    blason text
);


CREATE TYPE scripts AS ENUM('SP_Vue2', 'SP_Caract', 'SP_Profil2');

--DROP TABLE update;
CREATE TABLE update (
    id BIGSERIAL PRIMARY KEY,
    script scripts NOT NULL,
    troll integer REFERENCES troll(id) NOT NULL,
    date timestamp NOT NULL
--    by text REFERENCES users(login) NOT NULL
);

-- insert into update (troll, script, date, by) values ( 104259, 'SP_Caract', now(), 'DevelZimZoum');

-- DROP TABLE grants;
--CREATE TABLE grants (
--    id BIGSERIAL PRIMARY KEY,
--    date timestamp NOT NULL,
--    granted text REFERENCES users(login) NOT NULL,
--    troll integer REFERENCES troll(id) NOT NULL,
--    can_update boolean DEFAULT true NOT NULL,
--    CONSTRAINT grant_unique UNIQUE(granted, troll)
--);

-- insert into grants (date, granted, troll) values (now(), 'Wawa', 104259);
-- insert into grants (date, granted, troll) values (now(), 'DevelZimZoum', 50362),(now(), 'DevelZimZoum', 86132),(now(), 'DevelZimZoum', 86133),(now(), 'DevelZimZoum', 88222),(now(), 'DevelZimZoum', 90568),(now(), 'DevelZimZoum', 95636),(now(), 'DevelZimZoum', 100160);


CREATE TYPE families AS ENUM('Animal', 'Démon', 'Humanoïde', 'Insecte', 'Monstre', 'Mort-Vivant');

-- DROP TABLE monster;
CREATE TABLE monster (
    id integer PRIMARY KEY,
    nom text NOT NULL,
    pos_x integer,
    pos_y integer,
    pos_n integer,
    base_name text,
    family families,
    base_nival int4range,
    template text,
    template_bonus integer,
    age text,
    age_bonus integer,
    nival int4range
);

-- DROP TABLE voit;
CREATE TABLE voit (
    id BIGSERIAL REFERENCES update(id),
    monstre integer REFERENCES monster(id),
    pos_x integer NOT NULL,
    pos_y integer NOT NULL,
    pos_n integer NOT NULL,
    distance integer NOT NULL,
    CONSTRAINT voit_pk PRIMARY KEY (id, monstre)
);
