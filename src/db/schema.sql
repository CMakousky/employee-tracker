\c postgres;

DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE department(
  id SERIAL PRIMARY KEY NOT NULL,
  department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
  id SERIAL PRIMARY KEY NOT NULL,
  job_title VARCHAR(30) UNIQUE NOT NULL,
  salary MONEY NOT NULL,
  department_id INTEGER NOT NULL,
  
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER DEFAULT NULL,

  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
);