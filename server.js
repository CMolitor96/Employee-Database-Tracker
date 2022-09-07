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

const questions = [
    {
        type: 'input',
        message: 'View All Departments',
        name: 'viewDepart'
    },
    {
        type: 'input',
        message: 'View All Roles',
        name: 'viewRoles'
    },
    {
        type: 'input',
        message: 'View All Employees',
        name: 'viewEmployee'
    },
    {
        type: 'input',
        message: 'Add a Department',
        name: 'addDepartment'
    },
    {
        type: 'input',
        message: 'Add a Role',
        name: 'addRole'
    },
    {
        type: 'input',
        message: 'Add an Employee',
        name: 'addEmployee'
    },
    {
        type: 'input',
        message: 'Update Employee Role',
        name: 'updateEmployee'
    }
];

const initialQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'Please select from the following options: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'All finished for now']
    }
];

// inquirer
//     .prompt(initialQuestions).then(response => {
//         if (response.choice === 'View All Departments') {
//             console.log('success');
//             db.query(`SELECT * FROM department`, (err, results) => {
//                 console.table(results);

//             })
//         } else if (response.choice === 'View All Roles') {
//             db.query(`SELECT * FROM role`, (err, results) => {
//                 console.table(results);
//             })
//         } else if (response.choice === 'View All Employees') {
//             db.query(`SELECT * FROM employee`, (err, results) => {
//                 console.table(results);
//             })
//         } else if (response.choice === 'All finished for now') {
//             console.log('Have a nice day :)');
//             return;
//         }
//     });

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
    db.query(`SELECT department_name FROM department`, (err, results) => {
        for (i = 0; i < results.length; i++) {
            departmentArray.push(results[i].department_name)
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
            choices: departmentArray
        }
    ]).then(response => {
        console.log(response.roleName, response.salaryRole, response.roleDepartment);
    });
    initialQuestion();
}

// const promise = new Promise((resolve, reject) => {
//     resolve(db.query(`SELECT * from department`, (err, results) => {
//         return results;
//     }))
// });

// const mysqlPromise = require('mysql2/promise');
// let goose = mysqlPromise.createConnection({ host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database })
// .then(conn => conn.query(`SELECT * from role`))
// .then(response => console.log(response));

// async function test() {
//     const mysqlPromise = require('mysql2/promise');
//     const connection = await mysqlPromise.createConnection({ host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database });
//     const goose = await connection.execute(`SELECT * from department`);
//     console.table(goose);
// };




// db.query(`SELECT * from department`, (err, results) => {
//     console.table(results);
// });

// db.query(`SELECT * from role`, (err, results) => {
//     console.table(results);
// });

// db.query(`SELECT * from employee`, (err, results) => {
//     console.table(results);
// });
// test();
// inquirer
//     .prompt([{
//         type: 'input',
//         name: 'name',
//         message: 'What is your name? '
//     }])
//     .then(response => {
//         console.log(response.name);
//         const mysqlPromise = require('mysql2/promise');
//         let goose = mysqlPromise.createConnection({ host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database })
//         .then(conn => conn.query(`SELECT * from department`))
//         .then(table => console.table(table[0]));
//     });



// Promise.all([response, goose]).then(([response, connection]) => {
//     console.log(response);
//     console.table(connection);
// })
// promise.then((results) => {
//     console.table(results);
// });

// db.promise().query(`SELECT * from department`)
//     .then((response) => {
//         console.table(response);
//     })
//     .then(() => db.end());
// test();






