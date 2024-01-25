const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: [linkSchema],
    default: [],
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  shared: {
    type: String,
    enum: ["public", "shared", "private"],
    default: "public",
    required: true,
  },
  sharedWith: {
    type: [{ type: Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("list", listSchema);
