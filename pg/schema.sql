
DROP TABLE guilde;
CREATE TABLE guilde (
    id integer PRIMARY KEY,
    nom text NOT NULL
);

DROP TABLE users;
CREATE TABLE users (
    login text PRIMARY KEY,
    password text NOT NULL
);

DROP TABLE troll;
CREATE TABLE troll (
    id integer NOT NULL PRIMARY KEY,
    nom text NOT NULL,
    race text  NOT NULL,
    nival integer NOT NULL,
    password text,
    guilde integer REFERENCES guilde(id) NOT NULL,
    blason text,
    owner text REFERENCES users(login)
);

DROP TABLE update;
CREATE TABLE update (
    id integer NOT NULL PRIMARY KEY,
    troll integer REFERENCES troll(id) NOT NULL,
    date timestamp NOT NULL,
    by text REFERENCES users(login) NOT NULL
);

