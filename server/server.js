require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

// Express Setup
app.use(express.json());
app.use(cors(corsOptions));

// Mongoose Connection
const { connect } = require("./utilities/connect");
connect();

// Routes
const AuthRoute = require("./routes/AuthRoute");
const ListRoute = require("./routes/ListRoute");
const PublicListRoute = require("./routes/PublicListRoute");
const UserRoute = require("./routes/UserRoute");
// Utilities
const { VerifyRoute } = require("./utilities/verifyRoute");

app.use("/auth", AuthRoute);
app.use("/private", VerifyRoute, ListRoute);
app.use("/public", PublicListRoute);
app.use("/user", UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at Port: ${process.env.PORT}`);
});
