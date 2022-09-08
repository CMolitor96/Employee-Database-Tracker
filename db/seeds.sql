INSERT INTO department (department_name) VALUES ('Engineering');
INSERT INTO department (department_name) VALUES ('Management');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Legal');
INSERT INTO department (department_name) VALUES ('Customer Service');

INSERT INTO role (title, salary, department_name, department_id) VALUES ('Lead Engineer', 50000, 'Engineering', 1);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Junior Engineer', 25000, 'Engineering', 1);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Director', 100000, 'Management', 2);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Executive Assistant', 25000, 'Management', 2);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Money Manager', 80000, 'Finance', 3);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Financial Analyst', 50000, 'Finance', 3);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Legal Advisor', 80000, 'Legal', 4);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Senior Lawyer', 70000, 'Legal', 4);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Operations Manager', 50000, 'Customer Service', 5);
INSERT INTO role (title, salary, department_name, department_id) VALUES ('Service Representative', 20000, 'Customer Service', 5);

INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Tom', 'Cruise', 'Lead Engineer', 50000, 1000, 'Engineering', 'Tom Cruise', NULL);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Vin', 'Diesel', 'Junior Engineer', 25000, 1001, 'Engineering', 'Tom Cruise', 2000);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Dwayne', 'Johnson', 'Director', 100000, 1002, 'Management', 'Dwayne Johson', NULL);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Karl', 'Urban', 'Executive Assistant', 25000, 1003, 'Management', 'Dwayne Johson', 2002);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Mark', 'Hamill', 'Money Manager', 80000, 1004, 'Finance', 'Mark Hamill', NULL);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Harrison', 'Ford', 'Financial Analyst' , 50000, 1005, 'Finance', 'Mark Hamill', 2004);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Arnold', 'Schwartz', 'Legal Advisor' , 80000, 1006, 'Legal', 'Arnold Schwartz', NULL);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Jason', 'Statham', 'Senior Lawyer', 70000, 1007, 'Legal', 'Arnold Schwartz', 2006);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Jet', 'Li', 'Operations Manager' , 50000, 1008, 'Customer Service', 'Jet Li', NULL);
INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES ('Chris', 'Pine', 'Service Representative' , 20000, 1009, 'Customer Service', 'Jet Li', 2008);

-- UPDATE employee SET title = 'Money Manager', salary = 80000, role_id = 1004, department = 'Finance' WHERE id = 2000;