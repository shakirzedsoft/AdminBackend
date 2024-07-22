const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const villaRouter = require('./villa')

//auth
router.use('/auth',authRouter)

//villa project
router.use('/villa',villaRouter)






module.exports = router;
