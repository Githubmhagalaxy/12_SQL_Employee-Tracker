const inquirer = require('inquirer');
const database = require('./db/db');
const cTable = require('console.table');
const functions = require('./functions');

const questions = [
    {
        type: 'list',
        name: 'what_to_do',
        message: 'What size do you need?',
        loop: false,
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add an employee",
            "Remove employee",
            "Update employee role",
            "Update employee manager",
            "View all roles",
            "View all departments",
            "Add a department",
            "Add a role",
            "Remove department",
            "Remove role",
            "View a department budget",
            "Finish the program",
        ],
    },
];

const db = new database({
    host: "localhost",
    port: 3306,
    user: "root",
    database: 'rg_12th'
});

db.connect()
    .then(result => {
        init()
            .then(() => {
                console.log('closing program...');
                db.disconnect();
            })
            .catch(e => {
                console.log(e);
                db.disconnect()
            })
    })
    .catch(err => {
        console.error(err);
    })

const init = async () => {
    try {
        let answers = {},
            result,
            isFinished = false;
        console.log('connected to database');
        while (!isFinished) {
            answers = await inquirer.prompt(questions);
            switch (answers.what_to_do) {
                case "View all employees" :
                    result = await db.viewAllEmployees(0);
                    console.table(result);
                    break;
                case "View all employees by department" :
                    result = await db.viewAllEmployees(1);
                    console.table(result);
                    break;
                case "View all employees by manager" :
                    result = await db.viewAllEmployees(2);
                    console.table(result);
                    break;
                case "Add an employee" :
                    result = await functions.addEmployee(db);
                    console.table(result);
                    break;
                case "Remove employee" :
                    result = await functions.removeEmployee(db);
                    console.table(result);
                    break;
                case "Update employee role" :
                    result = await functions.updateRole(db);
                    console.table(result);
                    break;
                case "Update employee manager" :
                    result = await functions.updateManager(db);
                    console.table(result);
                    break;
                case "View all roles" :
                    result = await db.getRolesTitles();
                    console.table(result);
                    break;
                case "View all departments" :
                    result = await db.getDepartments();
                    console.table(result);
                    break;
                case "Add a department" :
                    result = await functions.addDepartment(db);
                    console.table(result);
                    break;
                case "Add a role" :
                    result = await functions.addRole(db);
                    console.table(result);
                    break;
                case "Remove department" :
                    result = await functions.removeDepartment(db);
                    console.table(result);
                    break;
                case "Remove role" :
                    result = await functions.removeRole(db);
                    console.table(result);
                    break;
                case "View a department budget" :
                    result = await functions.countDepartmentBudget(db);
                    console.table(result);
                    break;
                case "Finish the program" :
                    isFinished = true;
                    break;
                default:
                    isFinished = true;
                    break;
            }
        }
        return Promise.resolve();
    } catch (e) {
        return Promise.reject(e);
    }
}




