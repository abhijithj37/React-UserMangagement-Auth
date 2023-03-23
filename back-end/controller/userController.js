const db = require("../model/connection");
const bcrypt = require("bcrypt");
const { users } = require("../model/connection");
const { generateToken } = require("../auth");

module.exports = {
  signIn: (req, res) => {
    
    let { email, mobile } = req.body;
    db.users
      .find({ $or: [{ email: email }, { mobile: mobile }] })
      .then(async (response) => {
        if (response.length == 0) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
          db.users(req.body)
            .save()
            .then(() => {
              console.log("success");
              res.status(200).send("Registration successfull");
            });
        } else {
          console.log("exist");
          res.status(400).send("User already exist");
        }
      });
  },
  login: (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;
    db.users.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then(async (result) => {
          if (result) {
            const token = await generateToken(user.id);

            res.status(200).json({ token: token, user });
            console.log(token);
          } else {
            res.status(400).send("invalid password");
          }
        });
      } else {
        res.status(400).send("Invalid Login Details");
      }
    });
  },
  getUser: async (req, res) => {
    const userId = req.userId;
    console.log(userId, "dfsad");
    try {
      const user = await users.findOne({ _id: userId });
      console.log(user);
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(401).send("User Not Found");
    }
  },
  updateUser: (req, res) => {
    const userId = req.userId;
    let image=req.body.image
    const { name, userName, email, mobile } = req.body;
    if(req.file){
        image=req.file.filename
    }
    
      console.log(req.body, "to updateuser");
      users.updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            userName: userName,
            mobile: mobile,
            email: email,
            image:image
          },
        }
      ).then(()=>{
        users.findOne({_id:userId}).then((user)=>{res.status(200).json({user:user})})
      }).catch(err=>{res.status(401).send(err)}) 
  },
  uploadImage:(req,res)=>{
    const userId=req.userId
    console.log(req.file,'profile-image');
    users.updateOne({_id:userId},{$set:{image:req.file.filename}}).then(()=>{
        res.status(200).send('image saved successfully')
    }).catch((err)=>{
        console.log(err);
        res.status(400).send(err)
    })

  }
   
};
