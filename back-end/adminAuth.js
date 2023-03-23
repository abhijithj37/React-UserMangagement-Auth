const jwt = require("jsonwebtoken");

module.exports = {
  //Generating Token
  generateAdminToken: (userName) => {
    const token = jwt.sign({userName:userName}, "itsAdminSecretInAuthentication",{
      expiresIn: '2h',
    });
    return token;
  },

  //Verifing Token

  verifyAdminToken: (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) return res.send("no token");
    try {
      const decoded = jwt.verify(token, "itsAdminSecretInAuthentication");
      console.log(decoded.userName)
      req.admin=decoded.userName
       next()
    } catch(error){
        console.log(error.message);
      res.status(401).send("Unauthorized");

    }
  },
};