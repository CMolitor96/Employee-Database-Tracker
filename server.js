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
inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is your name? '
    }])
    .then(response => {
        console.log(response.name);
        const mysqlPromise = require('mysql2/promise');
        let goose = mysqlPromise.createConnection({ host: process.env.host, user: process.env.user, password: process.env.password, database: process.env.database })
        .then(conn => conn.query(`SELECT * from employee`))
        .then(table => console.log(table[0]));
    });



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






