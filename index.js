const express = require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const userRouter  = require("./routes/user.routes.js");
const authRouter  = require("./routes/auth.routes.js");

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
  app.use(express.json())
  app.use(cookieParser());
  app.use("/api/user",userRouter.router)
  app.use("/api/auth",authRouter.router)
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server started on " + process.env.PORT || 5000);
});
