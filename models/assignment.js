const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const AssignmentSchema = new Schema({
  name: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  description: { type: String, default: "description"},
  duedate: { type: Date, required: true },
  dropbox: { type: String, required: true }
});
// Always populate the author field
AssignmentSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))


module.exports = mongoose.model("Assignment", AssignmentSchema);
