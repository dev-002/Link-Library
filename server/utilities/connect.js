const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) =>
      console.log(`Database Connected with: ${res.connection.host}`)
    )
    .catch((err) =>
      console.log(`Error Occured while connecting to Database:`, err)
    );
};
