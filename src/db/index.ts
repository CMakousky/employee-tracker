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
            "SELECT id, department_name FROM department"
        );
    }

     // view all roles
     viewRoles() {
        return this.query(
            "SELECT id, job_title, salary, department_id FROM role"
        );
    }

     // view all employees
     viewEmployees() {
        return this.query(
            "SELECT id, first_name, last_name, role_id, manager_id FROM employee"
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
     addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number) {
        return this.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", 
            [first_name, last_name, role_id, manager_id]
        );
     }

     // update an employee role
     updateEmployeeRole(id: number, role_id: number) {
        return this.query(
            "UPDATE employee SET role_id = $2 WHERE id = $1", [id, role_id]
        );
     }
}