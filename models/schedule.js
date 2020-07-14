const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const ScheduleSchema = new Schema({
  name: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  syllabus: { type: String, default: "None" },
  grades: { type: String, default: "None" },
  tracker: { type: String, default: "None" },
});
// Always populate the author field
ScheduleSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Schedule", ScheduleSchema);
