const express=require('express')
const { verifyAdminToken } = require('../adminAuth')
const { adminLogin, getAllUsers,getUser, userUpdate, deleteUser, addUser } = require('../controller/adminController')
const {storage}=require('../storage/multer')
const multer=require('multer')

const router=express.Router()
const upload = multer({ storage: storage }).single('image');


router.post('/adminLogin',adminLogin)
router.get('/getAllUsers',verifyAdminToken,getAllUsers)
router.get('/getUser/:id',verifyAdminToken,getUser)
router.put('/userUpdate/:id',verifyAdminToken,upload,userUpdate)
router.delete('/deleteUser/:id',verifyAdminToken,deleteUser)
router.post('/addUser',verifyAdminToken,addUser)

module.exports=router 