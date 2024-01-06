const app = require("./app");

// Mongoose Connection
const { connect } = require("./utilities/connect");

connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error Starting the server:", error);
  });
