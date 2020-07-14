const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, default: "None"},
});

module.exports = mongoose.model("Note", NoteSchema);
