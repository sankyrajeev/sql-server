DROP DATABASE IF EXISTS data_db;

CREATE DATABASE data_db;

USE data_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL

);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    CONSTRAINT fk_dept FOREIGN KEY(department_id) REFERENCES department(id) 
    ON DELETE SET NULL
);

CREATE TABLE employee(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     role_id INT,
     manager_id INT REFERENCES employee(id)
     ON DELETE SET NULL,
     CONSTRAINT fk_employee FOREIGN KEY(role_id) REFERENCES role(id) 

);
