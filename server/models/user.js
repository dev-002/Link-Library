const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  liked: {
    type: [{ type: Schema.Types.ObjectId, ref: "list" }],
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
