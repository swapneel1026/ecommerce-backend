const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected to ecommerce-shop");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server started on " + process.env.PORT || 5000);
});
