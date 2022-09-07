INSERT INTO department (department_name) VALUES ('Engineering');
INSERT INTO department (department_name) VALUES ('Management');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Legal');
INSERT INTO department (department_name) VALUES ('Customer Service');

INSERT INTO role (title, salary, department_name, department_id) VALUES ('Lead Engineer', 50000, 'Engineering', 1);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Junior Engineer', 25000, 'Engineering', 1);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('CEO', 100000, 'Management', 2);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Executive Assistant', 25000, 'Management', 2);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('CFO', 80000, 'Finance', 3);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Financial Analyst', 50000, 'Finance', 3);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('CLO', 80000, 'Legal', 4);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Senior Lawyer', 70000, 'Legal', 4);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Head of Operations', 50000, 'Customer Service', 5);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Service Representative', 20000, 'Customer Service', 5);

-- INSERT INTO role (title, salary, department_id) VALUES ('designer', 45000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Tom', 'Cruise', 1000, 'Tom Cruise', NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Vin', 'Diesel', 1001, 'Tom Cruise', 2000);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Dwayne', 'Johnson', 1002, 'Dwayne Johson', NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Karl', 'Urban', 1003, 'Dwayne Johson', 2002);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Mark', 'Hamill', 1004, 'Mark Hamill', NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Harrison', 'Ford', 1005, 'Mark Hamill', 2004);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Arnold', 'Schwartz', 1006, 'Arnold Schwartz', NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Jason', 'Statham', 1007, 'Arnold Schwartz', 2006);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Jet', 'Li', 1008, 'Jet Li', NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id) VALUES ('Chris', 'Pine', 1009, 'Jet Li', 2008);