const villa = require('../models/villa');





//createVilla
exports.createVilla = async (req, res, next) => {


    try {
        const { aedprice, investmentreturn,
            location, netyield,
            noofbed, roomno, status, heading,
            totalreturn
        } = req.body;

        console.log(">>>>>>",req.files)

        const imagePaths = req?.files?.map(file => file?.filename);
        console.log("IMG>>>>>", imagePaths)
        console.log(req.body)

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
        })

        return res.status(201).json(newData)

    } catch (err) {
        next(err)
    }

}