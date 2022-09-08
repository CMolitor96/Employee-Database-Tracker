DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_name VARCHAR(30),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
ALTER TABLE role AUTO_INCREMENT=1000;

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title VARCHAR(30),
    salary DECIMAL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    department VARCHAR(30),
    manager_name VARCHAR(30),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
ALTER TABLE employee AUTO_INCREMENT=2000;