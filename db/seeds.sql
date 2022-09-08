INSERT INTO department (department_name) 
VALUES ('Engineering'),
       ('Management'),
       ('Finance'),
       ('Legal'),
       ('Customer Service');

INSERT INTO role (title, salary, department_name, department_id) 
VALUES ('Lead Engineer', 50000, 'Engineering', 1),
       ('Junior Engineer', 25000, 'Engineering', 1),
       ('Director', 100000, 'Management', 2),
       ('Executive Assistant', 25000, 'Management', 2),
       ('Money Manager', 80000, 'Finance', 3),
       ('Financial Analyst', 50000, 'Finance', 3),
       ('Legal Advisor', 80000, 'Legal', 4),
       ('Senior Lawyer', 70000, 'Legal', 4),
       ('Operations Manager', 50000, 'Customer Service', 5),
       ('Service Representative', 20000, 'Customer Service', 5);

INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) 
VALUES ('Tom', 'Cruise', 'Lead Engineer', 50000, 1000, 'Engineering', 'Tom Cruise', NULL),
       ('Vin', 'Diesel', 'Junior Engineer', 25000, 1001, 'Engineering', 'Tom Cruise', 2000),
       ('Dwayne', 'Johnson', 'Director', 100000, 1002, 'Management', 'Dwayne Johson', NULL),
       ('Karl', 'Urban', 'Executive Assistant', 25000, 1003, 'Management', 'Dwayne Johson', 2002),
       ('Mark', 'Hamill', 'Money Manager', 80000, 1004, 'Finance', 'Mark Hamill', NULL),
       ('Harrison', 'Ford', 'Financial Analyst' , 50000, 1005, 'Finance', 'Mark Hamill', 2004),
       ('Arnold', 'Schwartz', 'Legal Advisor' , 80000, 1006, 'Legal', 'Arnold Schwartz', NULL),
       ('Jason', 'Statham', 'Senior Lawyer', 70000, 1007, 'Legal', 'Arnold Schwartz', 2006),
       ('Jet', 'Li', 'Operations Manager' , 50000, 1008, 'Customer Service', 'Jet Li', NULL),
       ('Chris', 'Pine', 'Service Representative' , 20000, 1009, 'Customer Service', 'Jet Li', 2008);
