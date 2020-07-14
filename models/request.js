const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const RequestSchema = new Schema({
  title: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  imgurl: {type: String, default:"None"},
  description: { type: String, default: "description"},
  duedate: { type: Date, required: true},
});
// Always populate the author field
RequestSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Request", RequestSchema);
