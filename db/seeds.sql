INSERT INTO department (department_name) VALUES ('Engineering');
INSERT INTO department (department_name) VALUES ('Management');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO role (id, title, salary) VALUES (2, 'Lead Engineer', 50000);
INSERT INTO role (id, title, salary) VALUES (3, 'Junior Engineer', 25000);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Darren', 'Asaro', 2, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Charlie', 'Molitor', 3, 3);