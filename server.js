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

function initialQuestion() {
    inquirer.prompt(initialQuestions).then(response => { viewTables(response) })
}
initialQuestion();

function viewTables(response) {
    if (response.choice === 'View All Departments') {
        db.query(`SELECT * FROM department`, (err, results) => {
            console.table(results);
            initialQuestion();
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
    }
};

async function addDepartment() {
    await inquirer.prompt([{ type: 'input', message: 'Department Name: ', name: 'departmentName' }]).then(response => {
        console.log('Department Sucessfully Added');
        db.query(`INSERT INTO department (department_name) VALUES (?)`, response.departmentName, (err, result) => { });
    });
    initialQuestion();
}

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
        console.log('Role Successfully Added');
        // console.log(departmentObjectArray);
        // console.log(response.roleDepartment)
        // console.log(departmentObjectArray[0].department_name);
        let roleId;
        for (i = 0; i < departmentObjectArray.length; i ++) {
            if (departmentObjectArray[i].department_name === response.roleDepartment) {
                roleId = departmentObjectArray[i].id;
            }
        }
        // console.log(roleId);
        // console.log(response.roleName);
        // console.log(response.salaryRole);
        db.query(`INSERT INTO role (title, salary, department_name, department_id) VALUES (?, ${response.salaryRole}, ${JSON.stringify(response.roleDepartment)}, ${roleId})`, response.roleName, (err, res) => { console.log(err);});
    });
    initialQuestion();
}








