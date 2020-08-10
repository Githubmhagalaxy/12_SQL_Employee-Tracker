const mysql = require('mysql2');

class db {
    connection;
    constructor(obj) {
        this.connection = mysql.createConnection(obj).promise();
    }
    connect = async () => {
        try {
            await this.connection.connect();
            return Promise.resolve('connected to db successfully');
        } catch (e) {
            return Promise.reject('could not connect to db');
        }
    }
    disconnect = () => {
        this.connection.end();
    }
    viewAllEmployees = async (order) => {
        try {
            let sql = '';
            switch (order) {
                case 0:
                    sql = `
                    SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                    FROM employee AS e1 LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
                    INNER JOIN role ON e1.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id
                    UNION
                    SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                    FROM employee AS e1 RIGHT JOIN employee AS e2 ON e1.manager_id = e2.id
                    INNER JOIN role ON e1.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id
                    ORDER BY id ASC
                    `;
                    break;
                case 1:
                    sql = `
                    SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                    FROM employee AS e1 LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
                    INNER JOIN role ON e1.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id
                    UNION
                    SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                    FROM employee AS e1 RIGHT JOIN employee AS e2 ON e1.manager_id = e2.id
                    INNER JOIN role ON e1.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id
                    ORDER BY department ASC
                    `;
                    break;
                case 2:
                    sql = `
                    SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                    FROM employee AS e1 LEFT JOIN employee AS e2 ON e1.manager_id = e2.id
                    INNER JOIN role ON e1.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id
                    UNION
                    SELECT e1.id, e1.first_name, e1.last_name, role.title, role.salary, department.name AS department, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
                    FROM employee AS e1 RIGHT JOIN employee AS e2 ON e1.manager_id = e2.id
                    INNER JOIN role ON e1.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id
                    ORDER BY manager ASC
                    `;
                    break;
                default:
                    break;
            }
            const [result] = await this.connection.query(sql);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }
    addEmployee = async (data) => {
        try {
            const [result] = await this.connection.query(`INSERT INTO employee SET ?`, data);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }
    getRolesTitles = async () => {
        try {
            const [result] = await this.connection.query(`SELECT id, title FROM role`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }
    getEmployees = async () => {
        try {
            const [result] = await this.connection.query(`SELECT id, CONCAT(employee.first_name, ' ', employee.last_name) AS manager FROM employee`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }
    getDepartments = async () => {
        try {
            const [result] = await this.connection.query(`SELECT id, name FROM department`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e);
        }
    }
    removeEmployee = async (data) => {
        try {
            const [result] = await this.connection.query(`DELETE FROM employee WHERE id=${data.id}`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    updateRole = async (data) => {
        try {
            const [result] = await this.connection.query(`UPDATE employee SET role_id=${data.role_id} WHERE id=${data.id}`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    updateManager = async (data) => {
        try {
            let tmp = data.manager_id ? data.manager_id : 'NULL';
            const [result] = await this.connection.query(`UPDATE employee SET manager_id=${tmp} WHERE id=${data.id}`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    addDepartment = async (data) => {
        try {
            const [result] = await this.connection.query(`INSERT INTO department SET ?`, data);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    addRole = async (data) => {
        try {
            const [result] = await this.connection.query(`INSERT INTO role SET ?`, data);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    removeDepartment = async (data) => {
        try {
            const [result] = await this.connection.query(`DELETE FROM department WHERE id=${data.id}`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    removeRole = async (data) => {
        try {
            const [result] = await this.connection.query(`DELETE FROM role WHERE id=${data.id}`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
    getRolesSalaries = async (data) => {
        try {
            const [result] = await this.connection.query(`SELECT salary FROM role WHERE department_id=${data.department_id}`);
            return Promise.resolve(result);
        } catch (e) {
            return Promise.reject(e.message);
        }
    }
}

module.exports = db;