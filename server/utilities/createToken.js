const jwt = require("jsonwebtoken");

const createToken = (data) => {
  // Creating a token
  const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  return token;
};

module.exports = createToken;
