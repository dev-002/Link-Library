const app = require("./app");

// Mongoose Connection
const connect = require("./utilities/connect");

connect()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server Started at Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error Starting the server:", error);
  });
