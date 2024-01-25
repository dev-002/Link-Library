const bcrypt = require("bcrypt");
const User = require("../models/user");
const createToken = require("../utilities/createToken");

exports.LoginController = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if data provided
  if (email && password) {
    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      // Check if password matches
      if (await bcrypt.compare(password, user.password)) {
        const token = createToken({
          _id: user._id,
          username: user.username,
          role: user.role,
        });

        return res.status(200).json({
          msg: "User Logged In Successfully",
          user,
          token: "bearer " + token,
        });
      }
      // if password incorrect
      else
        return res
          .status(400)
          .json({ success: false, error: "Incorrect Credentials" });
    }
    // if user not found
    else
      return res.status(404).json({ success: false, error: "No User Found" });
    // if no data provided
  } else
    return res.status(404).json({ success: false, error: "No Data Provided" });
};

exports.RegisterController = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Hash the password to be stored
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    // Create a new User
    const user = new User({ username, email, password: hashPassword });

    try {
      await user.save();
    } catch (saveError) {
      console.error("\n\n\nError occurred during save:", saveError);
      return res.status(500).json({
        error: `Already Existing value`,
        saveError,
      });
    }

    // Creating a token
    const token = createToken({
      _id: user._id,
      username: user.username,
      role: user.role,
    });

    return res.status(201).json({
      msg: "User Successfully Register",
      user,
      token: "bearer " + token,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error occured during registration",
      err,
    });
  }
};

exports.LogoutController = (req, res, next) => {
  return res.json({ success: true, msg: "Logout Successfully" });
};
