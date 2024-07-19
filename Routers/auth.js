const router = require('express').Router();
const authController = require('../controllers/authController');


router.post("/register/admin",authController.register)

router.post("/login/admin",authController.login)



module.exports = router;