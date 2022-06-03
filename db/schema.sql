DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department INT,
    FOREIGN KEY (department)
    REFERENCES department(dept_id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role INT,
    FOREIGN KEY (role)
    REFERENCES role(role_id)
    ON DELETE SET NULL,
    manager INT
);

/** ^^ NOT SURE IF FOREIGN KEY SETUP CORRECTLY?? 