const inquirer = require('inquirer');

const addEmployee = async ({ addEmployee, getRolesTitles, getEmployees }) => {
    try {
        const rolesTitlesDbResults = await getRolesTitles();
        let roles = rolesTitlesDbResults.map(role => {
            return role.title;
        });
        const managersDbResults = await getEmployees();
        managersDbResults.push({
            id: 'null',
            manager: 'null'
        })
        let managers = managersDbResults.map(manager => {
            return manager.manager ? manager.manager : "null";
        });
        let answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "what is employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "what is employee's last name?",
            },
            {
                type: 'list',
                name: 'role_id',
                message: "what is employee's role",
                loop: false,
                choices: roles,
                filter: (input) => {
                    let retVal = 0;
                    rolesTitlesDbResults.forEach((elem) => {
                        if(elem.title === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "what is employee's manager",
                loop: false,
                choices: managers,
                filter: (input) => {
                    let retVal = 0;
                    managersDbResults.forEach((elem) => {
                        if(elem.manager === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
        ]);
        if (answers.manager_id === 'null' || answers.manager_id === null) {
            delete answers.manager_id;
        }
        const results = await addEmployee(answers);
        return Promise.resolve(`added ${answers.first_name} ${answers.last_name} to the database`);
    } catch (e) {
        return Promise.reject(e);
    }
}

const removeEmployee = async ({ removeEmployee, getEmployees }) => {
    try {
        const managersDbResults = await getEmployees();
        let managers = managersDbResults.map(manager => {
            return manager.manager ? manager.manager : "null";
        });
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "what is employee's name?",
                loop: false,
                choices: managers,
                filter: (input) => {
                    let retVal = 0;
                    managersDbResults.forEach((elem) => {
                        if(elem.manager === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
        ]);
        const results = await removeEmployee(answers);
        return Promise.resolve(`employee removed from db`);
    } catch (e) {
        return Promise.reject(`this employee is a manager you should remove it's employees first`);
    }
}

const updateRole = async ({ getRolesTitles, updateRole, getEmployees }) => {
    try {
        const managersDbResults = await getEmployees();
        let managers = managersDbResults.map(manager => {
            return manager.manager ? manager.manager : "null";
        });
        const rolesTitlesDbResults = await getRolesTitles();
        let roles = rolesTitlesDbResults.map(role => {
            return role.title;
        });
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "what is employee's name?",
                loop: false,
                choices: managers,
                filter: (input) => {
                    let retVal = 0;
                    managersDbResults.forEach((elem) => {
                        if(elem.manager === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
            {
                type: 'list',
                name: 'role_id',
                message: "choose new role",
                loop: false,
                choices: roles,
                filter: (input) => {
                    let retVal = 0;
                    rolesTitlesDbResults.forEach((elem) => {
                        if(elem.title === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            }
        ]);
        const results = await updateRole(answers);
        return Promise.resolve(`employee role's changed`);
    } catch (e) {
        return Promise.reject(`oops!, somethings wrong`);
    }
}

const updateManager = async ({ getEmployees, updateManager }) => {
    try {
        const employeesDbResult = await getEmployees();
        let employees = employeesDbResult.map(manager => {
            return manager.manager ? manager.manager : "null";
        });
        const managersDbResults = await getEmployees();
        managersDbResults.push({
            id: 'null',
            manager: 'null'
        })
        let managers = managersDbResults.map(manager => {
            return manager.manager ? manager.manager : "null";
        });
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "what is employee's name?",
                loop: false,
                choices: employees,
                filter: (input) => {
                    let retVal = 0;
                    managersDbResults.forEach((elem) => {
                        if(elem.manager === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "what is manager's name?",
                loop: false,
                choices: managers,
                filter: (input) => {
                    let retVal = 0;
                    managersDbResults.forEach((elem) => {
                        if(elem.manager === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            }
        ]);
        if (answers.manager_id === 'null' || answers.manager_id === null) {
            delete answers.manager_id;
        }
        const results = await updateManager(answers);
        return Promise.resolve(`employee manager's changed`);
    } catch (e) {
        return Promise.reject(`oops!, somethings wrong`);
    }
}

const addDepartment = async ({ addDepartment }) => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What's new department name?",
            },
        ]);
        const results = await addDepartment(answers);
        return Promise.resolve(`department added successfully`);
    } catch (e) {
        return Promise.reject(`could not add department!!`);
    }
}

const addRole = async ({ addRole, getDepartments }) => {
    try {
        const departmentsINDB = await getDepartments();
        const departments = departmentsINDB.map(department => {
            return department.name;
        });
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "What's new role title?",
            },
            {
                type: 'input',
                name: 'salary',
                message: "how much is new role salary?",
            },
            {
                type: 'list',
                name: 'department_id',
                message: "what is department's name?",
                loop: false,
                choices: departments,
                filter: (input) => {
                    let retVal = 0;
                    departmentsINDB.forEach((elem) => {
                        if(elem.name === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
        ]);
        const results = await addRole(answers);
        return Promise.resolve(`role added successfully`);
    } catch (e) {
        return Promise.reject(`could not add role!!`);
    }
}

const removeDepartment = async ({ removeDepartment, getDepartments }) => {
    try {
        const departmentsInDB = await getDepartments();
        let departments = departmentsInDB.map(department => {
            return department.name;
        });
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "what is department's name?",
                loop: false,
                choices: departments,
                filter: (input) => {
                    let retVal = 0;
                    departmentsInDB.forEach((elem) => {
                        if(elem.name === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
        ]);
        const results = await removeDepartment(answers);
        return Promise.resolve(`department deleted successfully`);
    } catch (e) {
        return Promise.reject(`could not remove department`);
    }
}

const removeRole = async ({ removeRole, getRolesTitles }) => {
    try {
        const rolesInDb = await getRolesTitles();
        let roles = rolesInDb.map(department => {
            return department.title;
        });
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "what is department's name?",
                loop: false,
                choices: roles,
                filter: (input) => {
                    let retVal = 0;
                    rolesInDb.forEach((elem) => {
                        if(elem.title === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
        ]);
        const results = await removeRole(answers);
        return Promise.resolve(`role deleted successfully`);
    } catch (e) {
        return Promise.reject(`could not remove role`);
    }
}

const countDepartmentBudget = async ({ getDepartments, getRolesSalaries }) => {
    try {
        const departmentsInDb = await getDepartments();
        let departments = departmentsInDb.map(department => {
            return department.name;
        });
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: "what is department's name?",
                loop: false,
                choices: departments,
                filter: (input) => {
                    let retVal = 0;
                    departmentsInDb.forEach((elem) => {
                        if(elem.name === input) {
                            retVal = elem.id
                        }
                    });
                    return retVal;
                }
            },
        ]);
        const results = await getRolesSalaries(answers);
        let budget = 0;
        results.forEach(val => {
            budget += Number(val.salary);
        })
        return Promise.resolve(`department budget is ${budget}`);
    } catch (e) {
        return Promise.reject(`could not count budget`);
    }
}

module.exports = {
    addEmployee, removeEmployee, updateRole, updateManager, addDepartment, addRole, removeDepartment, removeRole, countDepartmentBudget
}