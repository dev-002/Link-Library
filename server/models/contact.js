const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  name: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

contactSchema.pre("save", (next) => {
  if (!this.user) {
    this.user = null;
  }
  next();
});

module.exports = mongoose.model("contact", contactSchema);
