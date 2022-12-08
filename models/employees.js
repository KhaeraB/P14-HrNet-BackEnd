const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  birthDate: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    minLength: 2,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
    minLength: 3,
  },
  department: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Employees', employeeSchema)

