INSERT INTO department (name) values ('department1');
INSERT INTO department (name) values ('department2');

INSERT INTO role (title, salary, department_id) values ('role1', 10000, 1);
INSERT INTO role (title, salary, department_id) values ('role2', 20000, 2);


INSERT INTO employee (first_name, last_name, role_id) values ('firstName1', 'lastName1', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('firstName2', 'lastName2', 2, 1);


