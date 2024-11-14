\c employee_db;

INSERT INTO department(id, department_name)
VALUES  (1, 'Department1'),
        (2, 'Department2'),
        (3, 'Department3'),
        (4, 'Department4');

INSERT INTO role(id, title, salary, department_id)
VALUES  (1, 'Role1', 60000.00, 1),
        (2, 'Role2', 65000.00, 2),
        (3, 'Role3', 55000.00, 3),
        (4, 'Role4', 62000.00, 4);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Tom', 'Thumb', 1, 1),
        (2, 'John', 'Doe', 2, 2),
        (3, 'Sarah', 'Jones', 3, 1),
        (4, 'Lisa', 'Lisa', 4, 5);