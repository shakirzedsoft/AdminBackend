
const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const router = require('./Routers/index')
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());






//router

app.use(router)


//dbconnection
mongoose.connect(process.env.MONGO_URL).then((res)=>{

}).catch((err)=>{

})

// connected/disconnected event
mongoose.connection.on('connected', () => {
    console.log(chalk.bold.yellow("SUCCCES FULLY CONNECTED DB"))

})

mongoose.connection.on('disconnected', () => {
    console.log(chalk.bold.red("MONGODB DISCONNECTED !!"))
})




//Global error middleware
app.use((err,req,res,next)=>{
    console.log("GLOBAL ERROR>>>",err)

    const errorStatus = err.status || 500;
    const errorMessage=err.message || 'Something went Wrong !!'

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})





//server
app.listen(process.env.PORT || 5000, () => {
    console.log(chalk.blue.bold(`SERVER IS RUNNING>>>${process.env.PORT}`))
})