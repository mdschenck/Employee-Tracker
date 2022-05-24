const Engineer = require("./lib/Engineer");
const Designer = require("./lib/Designer");
const Supervisor = require("./lib/Supervisor");
const Intern = require("./lib/Intern");

// const render = require("./src/pgTemplate");

const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");


const teamMembers = {
  manager: null,
  engineers: [],
  interns: [],
};

const idArray = [,];

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

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Which type of team member would you like to add",
        choices: ["Engineer", "Intern", "I am done building my team"],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
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

function buildTeam() {
  fs.writeFile("dist/team.html", render(teamMembers), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

createManager();
