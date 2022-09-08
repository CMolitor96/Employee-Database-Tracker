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
// initialQuestion();

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
    } else if (response.choice === 'Add an Employee') {
        addEmployee();
    } else if (response.choice === 'Update Employee Role') {
        updateEmployee();
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
        for (i = 0; i < departmentObjectArray.length; i++) {
            if (departmentObjectArray[i].department_name === response.roleDepartment) {
                roleId = departmentObjectArray[i].id;
            }
        }
        // console.log(roleId);
        // console.log(response.roleName);
        // console.log(response.salaryRole);
        db.query(`INSERT INTO role (title, salary, department_name, department_id) VALUES (?, ${response.salaryRole}, ${JSON.stringify(response.roleDepartment)}, ${roleId})`, response.roleName, (err, res) => { console.log(err); });
    });
    initialQuestion();
}

async function addEmployee() {
    let departmentArray = [];
    let departmentObjectArray = [];
    db.query(`SELECT * FROM role`, (err, results) => {
        // console.log(results);
        for (i = 0; i < results.length; i++) {
            departmentArray.push(results[i].title);
            departmentObjectArray.push(results[i]);
        }
    });
    let employeeArray = [];
    let managerArray = ['None'];
    let employeeObjectArray = [];
    let employeeObjectArraySimple;
    // let employeeObjectArraySimple2 = [];
    db.query(`SELECT * FROM employee`, (err, results) => {
        // console.log(results);
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
        // employeeObjectArraySimple.forEach(element => {
        //     if (!employeeObjectArraySimple2.includes(element)) {
        //         employeeObjectArraySimple2.push(element);
        //     }
        // })
    });
    // console.log(managerArray);
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
        // console.log(departmentArray);
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
            console.log(err);
        })
    });
    initialQuestion();
}

// async function updateEmployee() {
//     let allEmployeeArray = [];
//     let goose;
//     db.query(`SELECT * FROM employee`, (err, results) => {
//         // console.log(results);
//         for (i = 0; i < results.length; i++) {
//             let first_name = results[i].first_name;
//             let last_name = results[i].last_name;
//             let full_name = first_name + ' ' + last_name;
//             allEmployeeArray.push(full_name);
//         }
//         goose = allEmployeeArray;
//     });
//     console.log(goose);

//     let roleArray = [];

//     db.query(`SELECT * FROM role`, (err, results) => {
//         // console.log(results);
//         for (i = 0; i < results.length; i++) {
//             roleArray.push(results[i].title);
//         }
//         // console.log(roleArray);
//     });
//     console.log(managerArray);

//     await inquirer.prompt([
//         {
//             type: 'list',
//             message: "Which employee's role do you want to update? ",
//             choices: departmentArray,
//             name: 'employee',
//         },
//         {
//             type: 'list',
//             message: "Which role do you want to assign the selected employee? ",
//             choices: departmentArray,
//             name: 'role',
//         },
//     ]).then(response => {
//         console.log(response.employee);
//         console.log(response.role);

//         // db.query(`Update employee Set title = salary = department_name = department_id = WHERE id = `, (err, result) => {

//         // });
//     });
//     // initialQuestion();
// }

function allEmployeeArray() {
    let allEmployeeArray = [];
    db.query(`SELECT * FROM employee`, (err, results) => {
        // console.log(results);
        for (i = 0; i < results.length; i++) {
            let first_name = results[i].first_name;
            let last_name = results[i].last_name;
            let full_name = first_name + ' ' + last_name;
            allEmployeeArray.push(full_name);
        }
    });
    return allEmployeeArray;
}

let roleArray = [];
db.query(`SELECT * FROM role`, (err, results) => {
    for (i = 0; i < results.length; i++) {
        roleArray.push(results[i].title);
    }
});
console.log(roleArray);

let departmentArray = [];
let departmentObjectArray = [];
db.query(`SELECT * FROM role`, (err, results) => {
    // console.log(results);
    for (i = 0; i < results.length; i++) {
        departmentArray.push(results[i].title);
        departmentObjectArray.push(results[i]);
    }
});
console.log(departmentArray);
