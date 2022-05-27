// await connection.promise().query(SQL);

//USE anync await Then you get two values with that that you can index out if your query was successful.

async function listEmployees() {
  const promise = new Promise((resolve, reject) => {
    const db = mysql.createConnection(
      {
        host: "localhost",
        user: "root",
        password: "",
        database: "employees_db",
      },
      console.log(
        `Connected to the employees_db database. IN CREATE EMPLOYEE LIST`
      )
    );
    db.query(
      'SELECT CONCAT(last_name,", ", first_name) AS "name", id AS "value" FROM employee;',
      (err, result) => {
        db.end();
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
  return await promise;
}

async function changeEmployeeName() {
  inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "What is the employee's name to be changed to?",
      choices: await listEmployees(),
    },
  ]);
}
