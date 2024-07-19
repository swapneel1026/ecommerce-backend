const createHmac=require("crypto").createHmac

const passwordEncrypt = (originalPassword) =>{
    return  createHmac("sha256", process.env.ENC_KEY).update(originalPassword).digest("hex");
  
  }
  module.exports={passwordEncrypt}