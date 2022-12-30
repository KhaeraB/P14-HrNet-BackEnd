const mongoose = require("mongoose");

const statesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    abbreviation: {
      type: String,
      required: true,
      minLength: 2,
    },
  });



module.exports = mongoose.model('States', statesSchema)