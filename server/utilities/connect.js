const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then((res) =>
        console.log(`Database Connected with: ${res.connection.host}`)
      );
  } catch (error) {
    console.log(`Error Occured while connecting to Database:`, error);
  }
};
