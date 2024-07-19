const router = require("express").Router();
const {
  passwordEncrypt,
} = require("../helperFunctions/passwordEncryDecryption");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const newUser = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: passwordEncrypt(req.body.password),
      isAdmin: req.body.isAdmin || false,
    });

    return res.status(201).json({ ...newUser._doc });
  } catch (error) {
    res.send(error);
  }
});

// LOGIN USER

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const encryptedPass = passwordEncrypt(password)

    const isUser = await UserModel.findOne({
      username,
      password: encryptedPass,
    });
    
    if (isUser) {
      const authToken = jwt.sign({...isUser?._doc}, process.env.ENC_KEY);
      if(authToken){
        return res.cookie("authToken", authToken).json({message:"Successfully logged in!"});
      }
    } else {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = { router };
