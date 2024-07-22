const mongoose = require('mongoose');


const villaSchema = new mongoose.Schema({

    roomno:{
        type:Number,
        required:[true,"Room No is Required !!"]
    },
    heading:{
        type:String,
        required:[true,"heading is Required !!"]
    },
    image:{
        type:[String],
        required:[true,"IMG is Required !!"]
    },
    noofbed:{
        type:Number,
        required:[true,"No of bed is Required !!"]
    },
    location:{
        type:String,
        required:[true,"Location is Required !!"]
    },
    status:{
        type:String,
        required:[true,"Status is Required !!"]
    },
    aedprice:{
        type:Number,
        required:[true,"AED price is Required !!"]
    },
    fiveyrtotalreturn:{
        type:Number,
        required:[true,"5 yr total return price is Required !!"]
    },
    yearlyinvsmtreturn:{
        type:Number,
        required:[true,"yearly investment return price is Required !!"]
    },
    projectednetyeld:{
        type:Number,
        required:[true,"projected net yield price is Required !!"]
    }


},
    {
        timestamps: true
    })



module.exports = mongoose.model('villa', villaSchema);