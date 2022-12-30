const mongoose = require("mongoose");

const departmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  }
});

module.exports = mongoose.model("Departments", departmentsSchema);
