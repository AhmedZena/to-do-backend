let jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "authentication failed" });
  }
}

module.exports = auth;
