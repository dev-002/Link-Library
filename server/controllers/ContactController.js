const mongoose = require("mongoose");
const Contact = require("../models/contact");

const contactController = async (req, res, next) => {
  const { name, subject, message } = req.body;

  if (name && subject && message) {
    const cookieData = req.cookies.authorization;
    let user;
    if (cookieData) {
      user = mongoose.Types.ObjectId(cookieData._id);
    }

    const contactMessage = await Contact.create({
      user,
      name,
      subject,
      message,
    });

    return res.status(200).json({ message: "Success" });
  } else return res.status(400).json({ error: "No contact data provided" });
};

module.exports = { contactController };
