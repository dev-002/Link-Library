const jwt = require("jsonwebtoken");

module.exports.VerifyRoute = async (req, res, next) => {
  const bearerToekn = req.headers.authorization;
  const token = bearerToekn.split(" ")[1];
  try {
    if (jwt.verify(token, process.env.TOKEN_SECRET)) next();
  } catch (error) {
    return res.json({ success: false, error: "Invalid User or JWT expired" });
  }
};
