\c employee_db;

INSERT INTO department(department_name)
VALUES  ('Department1'),
        ('Department2'),
        ('Department3'),
        ('Department4');

INSERT INTO role(job_title, salary, department_id)
VALUES  ('Role1', 60000.00, 1),
        ('Role2', 65000.00, 2),
        ('Role3', 55000.00, 3),
        ('Role4', 62000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Tom', 'Thumb', 1, 1),
        ('John', 'Doe', 2, 2),
        ('Sarah', 'Jones', 3, 1),
        ('Lisa', 'Lisa', 4, 5);