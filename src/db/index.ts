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
     // view all employees
     // add a department
     // add a role
     // add an employee
     // update an employee role
}