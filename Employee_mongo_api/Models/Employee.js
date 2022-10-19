const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
});

//Creating the collection employee
const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
