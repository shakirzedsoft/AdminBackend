const router = require('express').Router();
const villaController = require('../controllers/villaController');
const fileUploadController = require('../controllers/fileUploadController');
const authController = require('../controllers/authController');



//create
router.post("/create",authController.protect,fileUploadController.upload.array('images',10),villaController.createVilla);

//getdata
router.get('/getalldata',villaController.getData)







module.exports = router;