const bcrypt = require("bcrypt");
const User = require("../models/user");

const LoginController = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if no data provided
  if (!(email && password)) {
    return res.status(404).json({ success: false, error: "No Data Provided" });
  }
  const user = await User.findOne({ email });
  // if user not found
  if (!user) {
    return res.status(404).json({ success: false, error: "No User Found" });
  }
  // Check for incorrect password
  if (!(await bcrypt.compare(password, user.password))) {
    return res
      .status(400)
      .json({ success: false, error: "Incorrect Credentials" });
  }
  // Creating a token
  const token = createToken({ id: user._id, name: user.name });

  res.clearCookie("auth_token");
  res.cookie("auth_token", token);
  return res.status(200).json({
    success: true,
    msg: "User Logged In Successfully",
    user,
    token: "bearer " + token,
  });
};

const RegisterController = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Hash the password to be stored
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    // Create a new User
    const user = await User.create({ name, email, password: hashPassword });
    // Creating a token
    const token = createToken({ id: user._id, name: user.name });

    res.clearCookie("auth_token");
    res.cookie("auth_token", token);
    return res.status(201).json({
      success: true,
      msg: "User Successfully Register",
      user,
      token: "bearer " + token,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "User Already Exists",
      err,
    });
  }
};

const LogoutController = (req, res, next) => {
  res.clearCookie("auth_token");
  return res.json({ success: true, msg: "Logout Successfully" });
};

module.exports = { LoginController, RegisterController, LogoutController };
