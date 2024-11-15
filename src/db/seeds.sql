\c employee_db;

INSERT INTO department(department_name)
VALUES  ('Legendary Duelists'),
        ('Hamon Students'),
        ('Aspiring Duelists'),
        ('Hamon Instructors');

INSERT INTO role(job_title, salary, department_id)
VALUES  ('King', 10000000.00, 1),
        ('Hamon Student', 50000.00, 2),
        ('Duelist', 60000.00, 3),
        ('Hamon Master', 70000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Jack', 'Atlas', 1, NULL),
        ('Joseph', 'Joestar', 2, 4),
        ('Caesar', 'Zeppeli', 2, 4),
        ('Lisa', 'Lisa', 4, NULL);