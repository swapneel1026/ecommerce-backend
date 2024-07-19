const jwt = require("jsonwebtoken");

const verifyAdmin = function (req, res, next) {
  if (req.cookies) {
    const tokenValue = jwt.verify(req.cookies.authToken, process.env.ENC_KEY);
    if (tokenValue?.isAdmin) {
      next();
    }else {
    return res
      .status(401)
      .json({ message: "You are not authorized to perform this operation!" });
  }
};
}
module.exports = { verifyAdmin };
