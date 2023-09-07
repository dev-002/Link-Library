const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
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
  category: {
    type: String,
    required: true,
  },
  shared: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("list", listSchema);
