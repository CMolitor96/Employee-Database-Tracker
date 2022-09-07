INSERT INTO department (department_name) VALUES ('Engineering');
INSERT INTO department (department_name) VALUES ('Management');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Engineer', 25000, 1);
-- INSERT INTO role (title, salary, department_id) VALUES ('designer', 45000, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, 'Darren', 'Asaro', 1000, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, 'Charlie', 'Molitor', 1001, 3);