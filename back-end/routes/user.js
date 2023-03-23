const express = require("express");
const { verifyToken } = require("../auth");
const {
  signIn,
  login,
  getUser,
  updateUser,
  uploadImage,
} = require("../controller/userController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { storage } = require("../storage/multer");

const upload = multer({ storage: storage }).single("image");

router.post("/register", signIn);

router.post("/login", login);

router.get("/about", verifyToken, (req, res) => {
  console.log(req.userId, "dfasjhdfas");
  res.send(" you can access this page");
});
router.get("/user", verifyToken, getUser);

router.put("/updateUser", verifyToken, upload, updateUser);

router.get("/image/:filename", (req, res) => {
  console.log("is there any thing");
  const filename = req.params.filename;

  const imagePath = path.join(__dirname, "../uploads/", filename);
  res.sendFile(imagePath);
});

module.exports = router;
