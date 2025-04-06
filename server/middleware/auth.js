const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = verified;
    console.log("Payload:", req.payload);

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
