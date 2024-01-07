const bcrypt = require("bcrypt");
const User = require("../models/user");
const createToken = require("../utilities/createToken");

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if ((!email, password)) {
    return res.status(400).json({ error: "Admin credentials not provied" });
  }

  const admin = await User.findOne({ email });
  if (!bcrypt.compare(password, admin.password)) {
    return res.status(403).json({ error: "Wrong email or password" });
  }
  if (admin.role !== "admin") {
    return res.status(403).json({ error: "Not Authorized Admin" });
  }

  const payload = {
    _id: admin._id,
    email: admin.email,
    role: admin.role,
  };
  const token = createToken(payload);
  res.cookie("auth_token", token);

  return res
    .status(200)
    .json({ name: admin.name, email: admin.email, role: admin.role });
};

const adminUserList = async (req, res, next) => {
  const { role } = req.locals.tokenData;
  if (role !== "admin") {
    return res.status(403).json({ error: "User not authorized" });
  }

  const userList = await User.find();
  return res.status(200).json({ user: userList });
};

module.exports = { adminLogin, adminUserList };
