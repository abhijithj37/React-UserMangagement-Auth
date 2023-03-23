const jwt = require("jsonwebtoken");

module.exports = {
  //Generating Token
  generateToken: (userId) => {
    const token = jwt.sign({ id: userId }, "haiiammernstackdeveloper",{
      expiresIn:'2h',
    });
    return token;
  },

  //Verifing Token

  verifyToken: (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) return res.send("no token");
    try {
      const decoded = jwt.verify(token, "haiiammernstackdeveloper");
      console.log(decoded.id)
      req.userId=decoded.id
       next()
    } catch(error){
        console.log(error.message);
      res.status(401).send("Unauthorized");

    }
  },
};
