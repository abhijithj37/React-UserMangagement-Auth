const bcrypt = require("bcrypt");
const { users } = require("../model/connection");
const { generateAdminToken } = require("../adminAuth");
const admin = require("../config/adminInfo");

module.exports = {
  adminLogin: (req, res) => {
    console.log(req.body, "admin data");
    const { userName, password } = req.body;
    if (userName === admin.userName) {
      bcrypt.compare(password, admin.password).then(async (result) => {
        if (result) {
          console.log(result, "compare result");
          const token = await generateAdminToken(userName);
          res.status(200).json({ token: token });
        } else {
          res.status(400).send("invalid password");
        }
      });
    } else {
      res.status(400).send("Invalid Login Details");
    }
  },
  getAllUsers: (req, res) => {
    users
      .find()
      .then((users) => {
        res.status(200).json({ users: users });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getUser: (req, res) => {
    const userId = req.params.id;

    users
      .findOne({ _id: userId })
      .then((user) => {
        res.status(200).json({ user: user });
      })
      .catch((err) => {
        res.status(401).send("User Not Found");
      });
  },
  userUpdate: (req, res) => {
    const userId = req.params.id;
    let image = req.body.image;
    console.log("currentimage", image);
    const { name, userName, email, mobile } = req.body;
    console.log(req.file, "its file");
    if (req.file) {
      image = req.file.filename;
    }
    console.log(image, "changed  image");
    users
      .updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            userName: userName,
            email: email,
            mobile: mobile,
            image: image,
          },
        }
      )
      .then(() => {
        users.find().then((users) => {
          res.status(200).json({ users: users });
        });
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  },
  deleteUser: (req, res) => {
    const userId = req.params.id;
    users
      .deleteOne({ _id: userId })
      .then(() => {
        users.find().then((users) => {
          res.status(200).json({ users: users });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addUser: (req, res) => {
    console.log(req.body);
    const{name,email,mobile,password}=req.body
    if(!(name&&email&&mobile&&password)){
      return res.status(400).send('Please fill all the fields')
    }
    users.findOne({ email: req.body.email }).then((result) => {
      console.log(result);
      if (!result) {
        users(req.body)
          .save()
          .then(() => {
            res.status(200).send("User Added successfuly");
          });
      } else {
        res.status(400).send("User Allready Exist");
      }
    });
  },
};
