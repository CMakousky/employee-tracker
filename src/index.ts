import DB from "./db/index.js";

const db = new DB();

db.viewDepartments()
    .then(({ rows }) => {console.table(rows)});