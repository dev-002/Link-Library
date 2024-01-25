const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  count: {
    type: Number,
    default: 1,
  },
  collection: {
    type: Schema.Types.ObjectId,
    ref: "collection",
    required: true,
  },
  by: {
    type: [
      {
        type: String,
        default: "Guest",
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("report", reportSchema);
