const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, "secretKey_this_sould_be_longer")
    } catch (err) {
      res.status(401).json({ message: "Auth Failed!" });
    }
}