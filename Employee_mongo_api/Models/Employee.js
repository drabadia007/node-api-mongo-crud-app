const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  empid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//Creating the collection employee
const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
