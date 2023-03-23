const express=require('express')
const app=express()
const cors=require('cors')

//Defining the routes
const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin')

app.use(cors())
app.use(express.json())
app.use('/',userRouter)
app.use('/admin',adminRouter)

 

app.listen(3000, (res) => {
console.log('server running in the port 3000')

})