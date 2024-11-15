import { pool } from "./connection.js";
import { QueryResult } from "pg";

export default class DB {
    constructor() {}

    async query(sql: string, args: any[] = []): Promise<QueryResult> {
        const client = await pool.connect();

        try {
            const result = client.query(sql, args);
            return result;
        } finally {
            client.release();
        }
    }

     // view all departments
    viewDepartments() {
        return this.query(
            "SELECT id, department_name \
            FROM department"
        );
    }

     // view all roles
     viewRoles() {
        return this.query(
            "SELECT role.id, job_title, salary, department.department_name AS department \
            FROM role \
            JOIN department \
                ON role.id = department.id"
        );
    }

     // view all employees
     viewEmployees() {
        return this.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.job_title, role.salary, department.department_name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name \
            FROM employee \
            LEFT OUTER JOIN employee AS manager \
                ON employee.manager_id = manager.id \
            JOIN role \
                ON employee.role_id = role.id \
            JOIN department \
                ON role.id = department.id"
        );
    }
    
     // add a department
    addDepartment(department_name: string) {
        return this.query(
            "INSERT INTO department(department_name) VALUES ($1)", [department_name]
        );
    }

     // add a role
     addRole(job_title: string, salary: number, department_id: number) {
        return this.query(
            "INSERT INTO role(job_title, salary, department_id) VALUES ($1, $2, $3)", [job_title, salary, department_id]
        );
     }

     // add an employee
     addEmployee(first_name: string, last_name: string, role_id: number, manager_id?: number | null) {
        let newEmployee;
        console.log(manager_id);
        if(Number.isNaN(manager_id)) {
            newEmployee = this.query(
                "INSERT INTO employee(first_name, last_name, role_id) VALUES ($1, $2, $3)", 
                [first_name, last_name, role_id]
            )
        } else {
            newEmployee = this.query(
                "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", 
                [first_name, last_name, role_id, manager_id]
            );
        };

        return newEmployee;
     }

     // update an employee role
     updateEmployeeRole(id: number, role_id: number) {
        return this.query(
            "UPDATE employee SET role_id = $2 WHERE id = $1", [id, role_id]
        );
     }
}