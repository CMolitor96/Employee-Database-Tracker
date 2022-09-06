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

const questions1 = [
    {
        type: 'list',
        name: 'choice',
        message: 'Please select from the following options: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
    }
];

inquirer
    .prompt(questions1).then(response => {
        if (response.choice === 'View All Departments') {
            console.log('success');
            db.query(`SELECT * FROM department`, (err, results) => {
                console.table(results);

            })
        } else if (response.choice === 'View All Roles') {
            db.query(`SELECT * FROM roles`, (err, results) => {
                console.table(results);
            })
        } else if (response.choice === 'View All Roles') {
            db.query(`SELECT * FROM roles`, (err, results) => {
                console.table(results);
            })
        }
    });


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






