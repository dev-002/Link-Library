const express = require("express");

const app = express();

// Routes
const HomeRoute = require("./routes/home");

app.use("/", HomeRoute);

app.listen(3000, () => {
  console.log("Server Started at Port: 3000");
});
