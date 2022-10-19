const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./Models/Employee.js");

const app = express();

app.use(express.json()); // middleware for all requests of app for JSON parsing

// app.use(express.urlencoded({ extended: true }));  // uncomment to get form data from HTML/App

//CONNECTING TO DB
const db_connection = mongoose.connect("mongodb://localhost:27017/");

db_connection.then((data) => {
  console.log("successfully connected to db");
});

// CREATE RECORD : Add New Address Entry to AdressBook Collection (Table of DB)
app.post("/api/AddNewEmployee", (req, res) => {
  let newEmployee = new Employee({
    id: req.body.id,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email_id: req.body.email_id,
  });

  newEmployee
    .save()
    .then((employee) => {
      res.status(201).send(employee);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

// READ : Specific Recored
app.get("/api/employee/:id", (req, res) => {
  Employee.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }

    res.status(200).send(user);
  });
});

// READ : List All Records
app.get("/api/employees", (req, res) => {
  Employee.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }

    res.status(200).send(user);
  });
});

// UPDATE : Specific record
app.put("/api/employee/:id", (req, res) => {
  let employee = {};

  if (req.body.f_name) employee.f_name = req.body.f_name;
  if (req.body.email_id) employee.email_id = req.body.email_id;
  if (req.body.l_name) employee.l_name = req.body.l_name;
  if (req.body.id) employee.id = req.body.id;

  Employee.updateOne({ _id: req.params.id }, { $set: employee })
    .then(() => {
      res.status(200).send(employee);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

// DELETE : Specific record
app.delete("/api/employee/:id", (req, res) => {
  Employee.remove({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.listen(8800, () => {
  console.log("sever listening on port:8800");
});
