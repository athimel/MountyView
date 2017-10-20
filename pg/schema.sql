DROP TABLE voit;
DROP TABLE monstre;
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

--DROP TABLE users;
CREATE TABLE users (
    login text PRIMARY KEY,
    password text NOT NULL
);

-- insert into users (login, password) values ( 'DevelZimZoum', 'azerty');
-- insert into users (login, password) values ( 'Wawa', 'azerty');

--DROP TABLE troll;
CREATE TABLE troll (
    id integer PRIMARY KEY,
    nom text NOT NULL,
    race text  NOT NULL,
    nival integer NOT NULL,
    password text,
    guilde integer REFERENCES guilde(id) NOT NULL,
    blason text,
    owner text REFERENCES users(login),
    CONSTRAINT races CHECK (race = 'Kastar' OR race = 'Durakuir' OR race = 'Skrim' OR race = 'Tomawak' OR race = 'Darkling' OR race = 'Nkrwapu')
);

-- update troll set owner='DevelZimZoum' where id=104259;
-- update troll set owner='Wawa' where id=90982;

--DROP TABLE update;
CREATE TABLE update (
    id BIGSERIAL PRIMARY KEY,
    script text NOT NULL,
    troll integer REFERENCES troll(id) NOT NULL,
    date timestamp NOT NULL,
    by text REFERENCES users(login) NOT NULL,
    CONSTRAINT scripts CHECK (script = 'SP_Vue2' OR script = 'SP_Caract' OR script = 'SP_Profil2')
);

-- insert into update (troll, script, date, by) values ( 104259, 'SP_Caract', now(), 'DevelZimZoum');

-- DROP TABLE grants;
CREATE TABLE grants (
    id BIGSERIAL PRIMARY KEY,
    date timestamp NOT NULL,
    granted text REFERENCES users(login) NOT NULL,
    troll integer REFERENCES troll(id) NOT NULL,
    can_update boolean DEFAULT true NOT NULL,
    CONSTRAINT grant_unique UNIQUE(granted, troll)
);

-- insert into grants (date, granted, troll) values (now(), 'Wawa', 104259);
-- insert into grants (date, granted, troll) values (now(), 'DevelZimZoum', 50362),(now(), 'DevelZimZoum', 86132),(now(), 'DevelZimZoum', 86133),(now(), 'DevelZimZoum', 88222),(now(), 'DevelZimZoum', 90568),(now(), 'DevelZimZoum', 95636),(now(), 'DevelZimZoum', 100160);


-- DROP TABLE monster;
CREATE TABLE monster (
    id integer PRIMARY KEY,
    nom text NOT NULL,
    pos_x integer,
    pos_y integer,
    pos_n integer,
    base_name text,
    family text,
    base_nival integer,
    template text,
    template_bonus integer,
    age text,
    age_bonus integer,
    nival integer
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
