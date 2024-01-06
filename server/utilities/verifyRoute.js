const jwt = require("jsonwebtoken");

module.exports.VerifyRoute = async (req, res, next) => {
  // const bearerToekn = req.headers.authorization;
  // const token = bearerToekn?.split(" ")[1];
  const token = req.cookies.auth_token;
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    if (data) {
      res.locals.tokenData = data;
      next();
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid User or JWT expired" });
  }
};
