# Employee-Tracker ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A SQL Based Employee Tracker using CLI Input, Node.js Express and Inquirer to manipulate a MySQL database.

# Description

A MySql Database based employee tracking application that makes use of command line input prompts via express and inquirer packages. The user is able to look up information about employees, roles and departments, including department and role names, and employee role and salary. If new roles or departments are added, the user can add them to the database. Likewise, as new employees are added, they are added to the database and assigned a unique ID. Employee roles can be updated as they move positions around the company or get promotions.

# Screenshot of command line interface input example:

![Screenshot  of command line interface input & file structure:](./assets/images/employee-tracker-screenshot.JPG)

# Link to video screengrab of application in use:

https://drive.google.com/file/d/1sGiB70UjJoiQhuzPM7xSG3bypnAVEjm0/view

# Link to GitHub repository:

https://github.com/mdschenck/Employee-Tracker

# User Story:

- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business

# Acceptance Criteria:

- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee???s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

# License:

MIT License https://opensource.org/licenses/MIT

# Questions:

For any questions please email mdschenck@gmail.com
