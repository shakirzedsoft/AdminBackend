const villa = require('../models/villa');





//createVilla
exports.createVilla = async (req, res, next) => {


    try {
        const { aedprice, investmentreturn,
            location, netyield,
            noofbed, roomno, status, heading,
            totalreturn, sqft, locationdesc,
            pptyoverviewdesc, amenities
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

            sqft: sqft,
            locationdesc: locationdesc,
            pptyoverviewdesc: pptyoverviewdesc,
            amenities: amenities
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


//singleViewById 
exports.singleViewById = async (req, res, next) => {

    try {
        const { id } = req.body;
        console.log(id)
        if (!id) {
            throw {
                message: "Id Missing",
                status: 401
            }
        }

        const singeViewByID = await villa.findById(id);
        return res.status(200).json(singeViewByID)

    } catch (err) {
        next(err)
    }

}


// updateVilla 
exports.updateVilla = async (req, res, next) => {

    try {
        const { id } = req.body;

        // console.log(req.body)

        const imagePaths = req?.files?.map(file => file?.filename);
        console.log("IMG>>>>>", imagePaths)
        if (imagePaths.length !== 0) {
            const updateData = await villa.findOneAndUpdate({ _id: id }, { $set: req.body, image: imagePaths }, { new: true, validateModifiedOnly: true })
            return res.status(200).json({
                message: "success",
                data: updateData
            })
        }

        if (imagePaths.length === 0) {
            const updateData = await villa.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, validateModifiedOnly: true })
            return res.status(200).json({
                message: "success",
                data: updateData
            })
        }

    } catch (err) {
        next(err)
    }

}



