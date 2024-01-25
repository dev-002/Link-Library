const jwt = require("jsonwebtoken");

const VerifyRoute = async (req, res, next) => {
  try {
    const bearerToekn = req.cookies.auth_token;
    if (!bearerToekn) {
      return res.status(401).json({ success: false, error: "Token not found" });
    }

    const token = bearerToekn?.split(" ")[1];
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.tokenData = data;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: error.name, message: "JWT expired", error });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = VerifyRoute;
