INSERT INTO department (id, department_name) VALUES (1,'Engineering');
INSERT INTO role (id, title, salary, department_id) VALUES (2, 'Lead Engineer', 50000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3, 'Junior Engineer', 25000, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Darren', 'Asaro', 2, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Charlie', 'Molitor', 3, 3);