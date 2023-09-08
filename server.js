require("dotenv").config();

const express = require("express");

const app = express();

// Express Setup
app.use(express.json());

// Mongoose Connection
const { connect } = require("./utilities/connect");
connect();

// Routes
const AuthRoute = require("./routes/AuthRoute");
const ListRoute = require("./routes/ListRoute");
const PublicListRoute = require("./routes/PublicListRoute");
// Utilities
const { VerifyRoute } = require("./utilities/verifyRoute");

app.use("/auth", AuthRoute);
app.use("/list", VerifyRoute, ListRoute);
app.use("/public", PublicListRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at Port: ${process.env.PORT}`);
});
