const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  role: {
    type: String,
    default: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  collections: {
    type: [{ type: Schema.Types.ObjectId, ref: "list" }],
    default: [],
  },
  categories: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
