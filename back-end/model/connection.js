const mongoose=require('mongoose')
db=mongoose.createConnection('mongodb://localhost:27017/My-app')

db.on('error',(err)=>{
    console.error();
})
db.once('open',()=>{
    console.log('Connection successfull');
})
const userSchema=new mongoose.Schema({
    userName:{
    type:String,
    require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:String

    
    
    


})



module.exports={
    users:db.model('users',userSchema )
}