require('dotenv').config();
const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    },
);

const initialQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'Please select from the following options: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'All finished for now']
    }
];

//This function is what starts entire program, and does not stop unless user specifies all finished option
function initialQuestion() {
    inquirer.prompt(initialQuestions).then(response => { viewTables(response) })
}
initialQuestion();

//Function to handle what happens based on user input of first question
function viewTables(response) {
    if (response.choice === 'View All Departments') {
        db.query(`SELECT * FROM department`, (err, results) => {
            if (err) {
                console.log(err);
            } else if (results) {
                console.table(results);
                initialQuestion();
            }
        })
    } else if (response.choice === 'View All Roles') {
        db.query(`SELECT * FROM role`, (err, results) => {
            console.table(results);
            initialQuestion();
        })
    } else if (response.choice === 'View All Employees') {
        db.query(`SELECT * FROM employee`, (err, results) => {
            console.table(results);
            initialQuestion();
        })
    } else if (response.choice === 'All finished for now') {
        console.log('Have a nice day :)');
        return;
    } else if (response.choice === 'Add a Department') {
        addDepartment();
    } else if (response.choice === 'Add a Role') {
        addRole();
    } else if (response.choice === 'Add an Employee') {
        addEmployee();
    } else if (response.choice === 'Update Employee Role') {
        updateEmployee();
    }
};

//Function for adding a department name to sql table department
async function addDepartment() {
    await inquirer.prompt([{ type: 'input', message: 'Department Name: ', name: 'departmentName' }]).then(response => {
        db.query(`INSERT INTO department (department_name) VALUES (?)`, response.departmentName, (err, result) => { 
            if (err) {
                console.log(err);
            } else if (result) {
                console.log(`${response.departmentName} successfully added`)
            }
        });
    });
    initialQuestion();
}

//Function for adding a role to table role
async function addRole() {
    let departmentArray = [];
    let departmentObjectArray = [];
    db.query(`SELECT * FROM department`, (err, results) => {
        for (i = 0; i < results.length; i++) {
            departmentArray.push(results[i].department_name);
            departmentObjectArray.push(results[i]);
        }
    });
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Role Name: ',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'Salary for Role: ',
            name: 'salaryRole'
        },
        {
            type: 'list',
            message: 'Deparatment in which role belongs: ',
            name: 'roleDepartment',
            choices: departmentArray,
        }
    ]).then(response => {
        //Getting role_id from user input from department to add to sql insert query
        let roleId;
        for (i = 0; i < departmentObjectArray.length; i++) {
            if (departmentObjectArray[i].department_name === response.roleDepartment) {
                roleId = departmentObjectArray[i].id;
            }
        }
        db.query(`INSERT INTO role (title, salary, department_name, department_id) VALUES (?, ${response.salaryRole}, ${JSON.stringify(response.roleDepartment)}, ${roleId})`, response.roleName, (err, res) => { 
            if (err) {
                console.log(err);
            } else if (res) {
                console.log(`${response.roleName} successfully added`)
            }
        });
    });
    initialQuestion();
}

//Function for adding new employee
async function addEmployee() {
    //Storing current roles in arrays to use when adding employee to database
    let departmentArray = [];
    let departmentObjectArray = [];
    db.query(`SELECT * FROM role`, (err, results) => {
        for (i = 0; i < results.length; i++) {
            departmentArray.push(results[i].title);
            departmentObjectArray.push(results[i]);
        }
    });

    //Storing all current employees in arrays and filtering by manager name for use when adding employee to database
    let employeeArray = [];
    let managerArray = ['None'];
    let employeeObjectArray = [];
    let employeeObjectArraySimple;
    db.query(`SELECT * FROM employee`, (err, results) => {
        for (i = 0; i < results.length; i++) {
            employeeArray.push(results[i].manager_name);
            employeeObjectArray.push(results);
            employeeObjectArraySimple = results;
        }
        employeeArray.forEach(name => {
            if (!managerArray.includes(name)) {
                managerArray.push(name);
            }
        })
        employeeObjectArray.forEach(element => {
            if (!employeeObjectArraySimple.includes(element)) {
                employeeObjectArraySimple.push(element);
            }
        })
    });
    await inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name? ",
            name: 'first_name',
        },
        {
            type: 'input',
            message: "What is the employee's last name? ",
            name: 'last_name',
        },
        {
            type: 'list',
            message: "What is the employee's role? ",
            choices: departmentArray,
            name: 'roleDepartment',
        },
        {
            type: 'list',
            message: "Who is the employee's manager? ",
            choices: managerArray,
            name: 'manager',
        }
    ]).then(response => {
        //Getting info based on user input for sql insertion
        let roleId;
        let salary;
        let title;
        let department;
        for (i = 0; i < departmentObjectArray.length; i++) {
            if (departmentObjectArray[i].title === response.roleDepartment) {
                roleId = departmentObjectArray[i].id;
                salary = departmentObjectArray[i].salary;
                title = departmentObjectArray[i].title;
                department = departmentObjectArray[i].department_name;
            }
        }
        let manager_id;
        if (response.manager === 'None') {
            response.manager = `${response.first_name} ${response.last_name}`;
            manager_id = null;
        } else if (response.manager != 'None') {
            for (i = 0; i < employeeObjectArraySimple.length; i++) {
                if (employeeObjectArraySimple[i].manager_name === response.manager) {
                    manager_id = employeeObjectArraySimple[i].id - 1;
                }
            }
        }

        db.query(`INSERT INTO employee (first_name, last_name, title, salary, role_id, department, manager_name, manager_id) VALUES (?, ${JSON.stringify(response.last_name)}, ${JSON.stringify(title)}, ${salary}, ${roleId}, ${JSON.stringify(department)}, ${JSON.stringify(response.manager)}, ${manager_id})`, response.first_name, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result) {
                 console.log(`${response.first_name} ${response.last_name} successfully added`);
            }
        })
    });
    initialQuestion();
}

//Function to turn db.query into a function so that we can use await on it
async function query(string) {
    return new Promise((resolve, reject) => {
        db.query(string, (err, results) => {
            resolve(results)
        });
    });
}

async function updateEmployee() {
    //Here query() is doing the same thing as db.query, but is now an independent function so can use await and arrays will
    //be populated and ready for when inquirer calls them a few lines down

    //Getting all employee names in first and last format into one array for use later in sql database
    const results = await query(`SELECT * FROM employee`);
    let employeeNameArray = [];
    let employeeArray = [];
    let first_name;
    let last_name;
    for (i = 0; i < results.length; i++) {
        first_name = results[i].first_name;
        last_name = results[i].last_name;
        let full_name = first_name + ' ' + last_name;
        employeeNameArray.push(full_name);
        employeeArray.push(results[i]);
    }

    //Getting all current roles and titles in arrays for use later in sql database
    const roles = await query(`SELECT * FROM role`);
    let roleArray = [];
    let allRoleArray = [];
    for (i = 0; i < roles.length; i++) {
        roleArray.push(roles[i].title);
        allRoleArray.push(roles[i]);
    }
    await inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update? ",
            choices: employeeNameArray,
            name: 'employee',
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee? ",
            choices: roleArray,
            name: 'role',
        },
    ]).then(response => {
        //Comparing user input name to names in database and choosing the employee that matches
        let splitName = response.employee.split(' ');
        let splitName1 = splitName[0];
        let splitName2 = splitName[1];
        let employeeId;
        for (i = 0; i < employeeArray.length; i++) {
            if (employeeArray[i].first_name === splitName1 && employeeArray[i].last_name === splitName2) {
                employeeId = employeeArray[i].id;
            }
        }
        //Comparing user input role title to database role titles and grabbing all associated information about role for sql database
        let depName;
        let salary;
        let roleId;
        for (i = 0; i < allRoleArray.length; i++) {
            if (response.role === allRoleArray[i].title) {
                depName = allRoleArray[i].department_name;
                salary = allRoleArray[i].salary;
                roleId = allRoleArray[i].id;
            }
        }

        db.query(`UPDATE employee SET title = ${JSON.stringify(response.role)}, salary = ${salary}, role_id = ${roleId}, department = ${JSON.stringify(depName)} WHERE id = ${employeeId};`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`${splitName1} ${splitName2} has been successfully updated`)
            }

        });
    });
    initialQuestion();
}
