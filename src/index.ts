import inquirer from "inquirer";
import logo from "asciiart-logo";
import DB from "./db/index.js";

const db = new DB();

function loadMainPrompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View all employees',
                    value: 'VIEW_EEMPLOYEES'
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add an employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Udate an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
            ]
        }
    ])
    .then(res => {
        const choice = res.choice;
        switch(choice) {
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            default: quit();
        }
    })
};

function viewDepartments() {
    db.viewDepartments()
    .then(({ rows }) => {
        const departments = rows;
        console.log(`\n`);
        console.table(departments);
    })
    .then(() => loadMainPrompts());
};

function viewRoles() {
    db.viewRoles()
    .then(({ rows }) => {
        const roles = rows;
        console.log(`\n`);
        console.table(roles);
    })
    .then(() => loadMainPrompts());
};

function viewEmployees() {
    db.viewEmployees()
    .then(({ rows }) => {
        const employees = rows;
        console.log(`\n`);
        console.table(employees);
    })
    .then(() => loadMainPrompts());
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'department_name',
            message: 'What is the department name?',
            type: 'input'
        }
    ])
    .then(resp => {})
};

function addRole() {};

function addEmployee() {};

function updateEmployeeRole() {};

function quit() {};

function init() {
    const logoText = logo({ name: "Employee Tracker" });
    console.log(logoText);

    loadMainPrompts();
};

// db.viewDepartments()
//     .then(({ rows }) => {console.table(rows)});

init();