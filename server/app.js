require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};

// Express Setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
const routes = require("./routes/routes");
app.use("/api/v1", routes);

module.exports = app;
