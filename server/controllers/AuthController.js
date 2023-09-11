const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.LoginController = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if data provided
  if (email && password) {
    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      // Check if password matches
      if (await bcrypt.compare(password, user.password)) {
        // Creating a token
        const token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.TOKEN_SECRET,
          { expiresIn: "10m" }
        );
        return res.json({
          success: true,
          msg: "User Logged In Successfully",
          user,
          token: "bearer " + token,
        });
      }
      // if password incorrect
      else return res.json({ success: false, error: "Incorrect Credentials" });
    }
    // if user not found
    else return res.json({ success: false, error: "No User Found" });
    // if no data provided
  } else return res.json({ success: false, error: "No Data Provided" });
};

exports.RegisterController = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Hash the password to be stored
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    // Create a new User
    const user = await User.create({ name, email, password: hashPassword });
    // Creating a token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    return res.json({
      success: true,
      msg: "User Successfully Register",
      user,
      token: "bearer " + token,
    });
  } catch (err) {
    return res.json({
      success: false,
      error: "Error occured during registration",
      err,
    });
  }
};

exports.LogoutController = (req, res, next) => {
  return res.json({ success: true, msg: "Logout Successfully" });
};
