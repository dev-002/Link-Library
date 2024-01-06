const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const { Schema } = mongoose;

const listSchema = new Schema({
  _id: {
    type: String,
    default: randomUUID(),
    required: true,
  },
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

const collectionSchema = new Schema({
  name: {
    type: String,
  },
  shared: {
    type: String,
    default: "private",
    // public: Public ,private: Private, shared: Shared
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  list: { type: [listSchema], default: [] },
});

module.exports = mongoose.model("list", collectionSchema);
