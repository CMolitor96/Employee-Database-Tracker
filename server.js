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

db.query(`SELECT * from department`, (err, results) => {
    console.table(results);
});

db.query(`SELECT * from role`, (err, results) => {
    console.table(results);
});

db.query(`SELECT * from employee`, (err, results) => {
    console.table(results);
});

inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is your name? '
    }]).then((response) => {
        console.log(response.name);
});





