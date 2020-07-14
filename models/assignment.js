const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, default: "description"},
  duedate: { type: Date, required: true },
  dropbox: { type: String, required: true }
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
