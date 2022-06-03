const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

// INIT function calls initial prompt on load and delegates functions based on input

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: `\n
*******************************\n
|       EMPLOYEE TRACKER      |\n
|         by: Michael S       |\n
*******************************\n
Choose An Action:`,
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add A Employee",
          "Update Employee Role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add A Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        default:
          return "Please select an action. Cntrl-C to Quit";
      }
    });
}

// VIEW ALL DEPARTMENTS FUNCION:

async function viewDepartments() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });
    db.query(
      'SELECT dept_id AS "id", department AS "department" FROM department',
      (err, result) => {
        db.end();
        if (err) {
          console.log(err);

          reject(err);
        } else {
          resolve(result);
          // console.log(result);
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(row.id + ". " + row.department);
          });
        }
      }
    );
  });
  await promise;
  newAction();
}

// VIEW ALL ROLES FUNCTION:

async function viewRoles() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });
    db.query(
      'SELECT role_id AS "id", title AS "role" FROM role',
      (err, result) => {
        db.end();
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
          // console.log(result);
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(row.id + ". " + row.role);
          });
        }
      }
    );
  });
  await promise;
  newAction();
}

// VIEW ALL EMPLOYEES FUNCTION - LISTS ALL EMPLOYEES NAMES, TITLES, SALARY & DEPARTMENT BY UTILIZING AND INNER JOIN FUNCTION TO DISPLAY EMPLOYEE INFORMATION FROM MULTIPLE TABLES.

async function viewEmployees() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });
    db.query(
      // 'SELECT employee.id AS "id", CONCAT(last_name, ", ", first_name) AS "name", role AS "role" FROM employee JOIN role ON employee.role = role.id',
      "SELECT * FROM employee JOIN role ON employee.role = role.role_id JOIN department ON role.department = department.dept_id",

      (err, result, fields) => {
        db.end();
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
          // console.log(result);
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(
              row.emp_id +
                ". " +
                row.last_name +
                ", " +
                row.first_name +
                " - " +
                row.title +
                ", Salary: $" +
                row.salary +
                " Dept: " +
                row.department
            );
          });
        }
      }
    );
  });
  await promise;
  newAction();
}

// ADD DEPARTMENT FUCTION - ADDS NEW DEPARTMENT

async function addDepartment() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });

    let answer;

    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "What is the Name of the new Department?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must enter at least one character!";
          },
        },
      ])

      .then((answer) => {
        console.log("Adding new Department: " + answer.departmentName);
        db.query(
          `INSERT INTO department (department) VALUES ('${answer.departmentName}')`,
          (err, result) => {
            db.end();
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
              console.log("Department Sucessfully Added!");
            }
          }
        );
      });
  });
  await promise;
  newAction();
}

// ADD ROLE FUNCTION - ADDS ROLE WITH ASSOCIATED SALARY AND DEPARTMENT INFO
async function addRole() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });

    let answer;

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the Name of the new Role?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must enter at least one character!";
          },
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the Salary for the new Role?",
          validate: (answer) => {
            const pass = answer.match(/^[20000-200000]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a whole number greater than 20000 and less than 200000 (no commas or punctuation please)";
          },
        },
        {
          type: "input",
          name: "roleDept",
          message: "What Department is the new Role in?",
          validate: (answer) => {
            const pass = true;
            // answer.match(/^[0-19]\d*$/);
            if (pass) {
              /*VALIDATE IF DEPT ID EXISTS IN DEPT TABLE????*/
              return true;
            }
            return "Please enter an existing Department number between 1 and 20.";
          },
        },
      ])

      .then((answer) => {
        console.log("Adding new Role: " + answer.roleName);
        db.query(
          `INSERT INTO role (title, salary, department) VALUES ('${answer.roleName}', ${answer.roleSalary}, ${answer.roleDept})`,
          (err, result) => {
            db.end();
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
              console.log("Role Sucessfully Added!");
            }
          }
        );
      });
  });
  await promise;
  newAction();
}

//ADD EMPLOYEE FUNCTION - ADDS NEW EMPLOYEE & ASSIGNS ROLE

async function addEmployee() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });

    let answer;

    inquirer
      .prompt([
        {
          type: "input",
          name: "empFirstName",
          message: "What is the new Employee's First Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must enter at least one character!";
          },
        },
        {
          type: "input",
          name: "empLastName",
          message: "What is the new Employee's Last Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must enter at least one character!";
          },
        },
        {
          type: "input",
          name: "empRole",
          message: "What is the new Employee's Role?",
          validate: (answer) => {
            const pass = true;
            // answer.match(/^[0-19]\d*$/);
            if (pass) {
              /*VALIDATE IF DEPT ID EXISTS IN ROLE TABLE????*/
              return true;
            }
            return "Please enter an existing role number between 1 and 20.";
          },
        },
      ])

      .then((answer) => {
        console.log(
          "Adding Employee: " +
            answer.empFirstName +
            " " +
            answer.empLastName +
            " " +
            " Role: " +
            answer.empRole
        );
        db.query(
          `INSERT INTO employee (first_name, last_Name, role) VALUES ('${answer.empFirstName}', '${answer.empLastName}', ${answer.empRole})`,
          (err, result) => {
            db.end();
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
              console.log("Employee Sucessfully Added!");
            }
          }
        );
      });
  });
  await promise;
  newAction();
}

// UPDATE ROLE FUNCTION - UPDATES AN EMPLOYEE'S ROLE

async function updateRole() {
  console.log("Update Emp Role @ init");

  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });
    db.query(
      // 'SELECT employee.id AS "id", CONCAT(last_name, ", ", first_name) AS "name", role AS "role" FROM employee JOIN role ON employee.role = role.id',
      "SELECT * FROM employee JOIN role ON employee.role = role.role_id JOIN department ON role.department = department.dept_id",

      (err, result, fields) => {
        db.end();
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
          // console.log(result);
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            console.log(
              row.emp_id + ". " + row.last_name + ", " + row.first_name
            );
          });
        }
      }
    );
  });
  await promise;

  const promise2 = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });

    let answer;

    inquirer
      .prompt([
        {
          type: "input",
          name: "empToUpdate",
          message:
            "Which Employee's role would you like to change (Please enter the employee's ID Number)?",
          validate: (answer) => {
            const pass = true;
            // answer.match(/^[0-19]\d*$/);
            if (pass) {
              /*VALIDATE IF EMP ID EXISTS IN EMP TABLE????*/
              return true;
            }
            return "Please enter a valid employee number between 1 and 20.";
          },
        },
        {
          type: "input",
          name: "newRole",
          message:
            "What is the Employee's New Role (Please enter an existing role number)?",
          validate: (answer) => {
            const pass = true;
            // answer.match(/^[0-19]\d*$/);
            if (pass) {
              /*VALIDATE IF DEPT ID EXISTS IN ROLE TABLE????*/
              return true;
            }
            return "Please enter an existing role number between 1 and 20.";
          },
        },
      ])

      .then((answer) => {
        console.log("Updating Employee Role to: " + answer.newRole);
        db.query(
          `UPDATE employee SET role=${answer.newRole} WHERE emp_id=${answer.empToUpdate}`,
          (err, result) => {
            db.end();
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
              console.log("Employee Role Sucessfully Updated!");
            }
          }
        );
      });
  });
  await promise2;
  newAction();
}

// NEW ACTION FUNCTION - CHECKS WITH USER IF THEY WOULD LIKE TO MAKE ANOTHER ACTION OR NEW QUERY.

function newAction() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: `\n------------------------------\n \nMake Another Selection?`,
        choices: ["Yes", "No Thanks, I'm Done Here"],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "Yes":
          init();
          break;
        default:
          return;
          break;
      }
    });
}

init();
