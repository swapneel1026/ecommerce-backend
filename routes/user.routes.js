const { verifyAdmin } = require("../middlewares/verifyAdmin");
const userModel = require("../models/user.model");

const router = require("express").Router();

router.get("/getusers", async (req, res) => {
  try {
    const allUsers = await userModel.find().lean();
    return res.status(200).json({ allUsers });
  } catch (error) {
    return res.send(error);
  }
});
router.delete("/deleteall",verifyAdmin, async(req,res)=>{
    const deleteall=await userModel.deleteMany()
    res.status(200).json({message:"All users deleted successfully!"})

})
module.exports = { router };
