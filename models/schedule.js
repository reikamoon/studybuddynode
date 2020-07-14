const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  syllabus: { type: String, default: "None" },
  grades: { type: String, default: "None" },
  tracker: { type: String, default: "None" },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
