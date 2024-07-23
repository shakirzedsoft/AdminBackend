const villa = require('../models/villa');





//createVilla
exports.createVilla = async (req, res, next) => {


    try {
        const { aedprice, investmentreturn,
            location, netyield,
            noofbed, roomno, status, heading,
            totalreturn,sqft,locationdesc,
            pptyoverviewdesc,amenities
        } = req.body;

        // console.log(">>>>>>",req.files)
        const imagePaths = req?.files?.map(file => file?.filename);
        console.log("IMG>>>>>", imagePaths)

        const newData = await villa.create({
            roomno: roomno,
            heading: heading,
            image: imagePaths,
            noofbed: noofbed,
            location: location,
            status: status,
            aedprice: aedprice,
            fiveyrtotalreturn: totalreturn,
            yearlyinvsmtreturn: investmentreturn,
            projectednetyeld: netyield,

            sqft:sqft,
            locationdesc:locationdesc,
            pptyoverviewdesc:pptyoverviewdesc,
            amenities:amenities
        })

        return res.status(201).json(newData)

    } catch (err) {
        next(err)
    }

}

//getdata
exports.getData = async (req, res, next) => {

    try {
        const allvillaproject = await villa.find()
        if (allvillaproject) {
            console.log(allvillaproject)
            return res.status(200).json(allvillaproject)
        }
        else {
            return res.status(200).json("NoData")
        }


    } catch (err) {
        next(err)
    }

}