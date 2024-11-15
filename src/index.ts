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
                    value: 'VIEW_EMPLOYEES'
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
                    name: 'Update an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Quit Program',
                    value: 'QUIT_PROGRAM'
                }
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
    .then(resp => {
        db.addDepartment(resp.department_name)
        .then(() => {
            console.log('Department added!');
            loadMainPrompts();
        })
    })
};

function addRole() {
    inquirer.prompt([
        {
            name: 'role_title',
            message: 'What is the role title?',
            type: 'input'
        },
        {
            name: 'salary',
            message: 'What is the salary for this role?',
            type: 'number'
        },
        {
            name: 'department_id',
            message: 'What is the department id for this role?',
            type: 'number'
        }
    ])
    .then(resp => {
        db.addRole(resp.role_title, resp.salary, resp.department_id)
        .then(() => {
            console.log('Role added!');
            loadMainPrompts();
        })
    })
};

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'What is the first name of this employee?',
            type: 'input'
        },
        {
            name: 'last_name',
            message: 'What is the last name of this employee?',
            type: 'input'
        },
        {
            name: 'role_id',
            message: 'What is the role id of this employee?',
            type: 'number'
        },
        {
            name: 'manager_id',
            message: 'What is the manager id of this employee?',
            type: 'number'
        }
    ])
    .then(resp => {
        db.addEmployee(resp.first_name, resp.last_name, resp.role_id, resp.manager_id)
        .then(() => {
            console.log('Employee added!');
            loadMainPrompts();
        })
    })
};

async function updateEmployeeRole() {
    const employeeQueryResp = await db.viewEmployees();
    console.table(employeeQueryResp.rows);

    const roleQueryResp = await db.viewRoles();
    console.table(roleQueryResp.rows);

    const choicesArr1 = employeeQueryResp.rows.map(employeeID => {
        return {
            name: employeeID.first_name,
            value: employeeID.id
        }
    });
    const choicesArr2 = roleQueryResp.rows.map(roleID => {
        return {
            name: roleID.job_title,
            value: roleID.id
        }
    });

    inquirer.prompt([
        {
            name: 'employee_id',
            message: 'Select the employee whose role you want to modify.',
            type: 'list',
            choices: choicesArr1
        },
        {
            name: 'role_id',
            message: 'Select the new role id number.',
            type: 'list',
            choices: choicesArr2
        }
    ])
    .then(resp => {
        db.updateEmployeeRole(resp.employee_id, resp.role_id)
        .then(() => {
            console.log(`Employee role changed!`);
            loadMainPrompts();
        })
    })
};

function quit() {
    console.log('Goodbye!');
    process.exit();
};

function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();
    console.log(logoText);

    loadMainPrompts();
};

// db.viewDepartments()
//     .then(({ rows }) => {console.table(rows)});

init();