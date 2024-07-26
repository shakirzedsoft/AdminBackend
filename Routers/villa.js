const router = require('express').Router();
const villaController = require('../controllers/villaController');
const fileUploadController = require('../controllers/fileUploadController');
const authController = require('../controllers/authController');



//create
router.post("/create",authController.protect,fileUploadController.upload.array('images',10),villaController.createVilla);

//getAlldata
router.get('/getalldata',villaController.getData)

//singleViewbyId_data
router.post('/singleviewbyId',villaController.singleViewById)

//edit 
router.put('/updatevilla',fileUploadController.upload.array('images',10),villaController.updateVilla)

//delete
router.delete('/delete',villaController.deletevilla)







module.exports = router;