DROP DATABASE IF EXISTS dragons;
CREATE DATABASE dragons;

\c dragons;

CREATE TABLE wyrms (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  color VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO wyrms (name, color, age, sex)
  VALUES ('Sartharion', 'Red', 86, 'M');