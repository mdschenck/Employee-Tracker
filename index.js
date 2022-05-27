const Employee = require("./lib/Employee");
// const Role = require("./lib/Role");
// const Department = require("./lib/Department");

const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

// const teamMembers = {
//   manager: null,
//   engineers: [],
//   interns: [],
// };

// const idArray = [,];

// INIT function calls initial prompt on load and delegates functions based on input

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: `\n
*******************************\n
|        <O  -^u^-   O>       |\n
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
          console.log("View Employees @ init");
          break;
        case "Add A Department":
          addDepartment();
          console.log("Add A Department @ init");
          break;
        case "Add A Role":
          addRole();
          console.log("Add A Role @ init");
          break;
        case "Add A Employee":
          addEmployee();
          console.log("Add A Employee @ init");
          break;
        case "Update Employee Role":
          updateRole();
          console.log("Update Emp Role @ init");
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
      // "SELECT * FROM department",
      'SELECT id AS "id", department AS "department" FROM department',
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
  // return
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
      // "SELECT * FROM department",
      'SELECT id AS "id", title AS "role" FROM role',
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
  // return
  await promise;
  newAction();
}
// VIEW ALL EMPLOYEES FUNCTION:

async function viewEmployees() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "employees_db",
    });
    db.query(
      'SELECT id AS "id", CONCAT(last_name, ", ", first_name) AS "name" FROM employee, role AS "role" FROM employee',
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
            console.log(row.id + ". " + row.name + " - " + row.role);
          });
        }
      }
    );
  });
  // return
  await promise;
  newAction();
}

// NEW ACTION FUNCTION - CHECKS WITH USER IF THEY WOULD LIKE TO MAKE ANOTHER ACTION or NEW Query.

function newAction() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: `*^~-~^*^~-~^*^~--<O-^u^-O>\nMake Another Selection?`,
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
//************************************************
/*
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the Team Manager's Name?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Must enter at least one character!";
        },
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the team Manager's id",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a number greater than zero";
        },
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the team Manager's email",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address";
        },
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the team Manager's office number",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a number greater than zero";
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );

      teamMembers.manager = manager;
      idArray.push(answers.managerId);
      createTeam();
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the Engineer's Name?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Must enter at least one character!";
        },
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the Engineer's id",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a number greater than zero";
        },
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the Engineer's email",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address";
        },
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the Engineer's github?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub
      );

      teamMembers.engineer = engineer;
      idArray.push(answers.engineererId);
      createTeam();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the Intern's Name?",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Must enter at least one character!";
        },
      },
      {
        type: "input",
        name: "internId",
        message: "What is the Intern's id",
        validate: (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a number greater than zero";
        },
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email",
        validate: (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address";
        },
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the Intern's school?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internschool
      );

      teamMembers.intern = intern;
      idArray.push(answers.internId);
      createTeam();
    });
}

// REPLACE WITH WRITE TO DATABASE??

// function buildTeam() {
//   fs.writeFile("dist/team.html", render(teamMembers), (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// }

createManager();

*/
