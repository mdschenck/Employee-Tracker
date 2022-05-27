class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  // getId() {
  //   return this.id;
  // }
  // getName() {
  //   return this.name;
  // }
  // getEmail() {
  //   return this.email;
  // }
  // getRole() {
  //   return "Employee";
  // }
}

//Test Function::

// const employee1 = new Employee("Michael", 44, "example@ex.com");
// employee1.getId();
// employee1.getName();
// employee1.getEmail();
// console.log(employee1.name + " - " + employee1.id + " - " + employee1.email);

module.exports = Employee;
