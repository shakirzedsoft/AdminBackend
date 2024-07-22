const bcrypt = require('bcrypt');
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const { promisify } = require('util'); 



//signToken
const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET)


//register
exports.register = async (req, res, next) => {

    try {

        const { email, name, phone, password } = req.body;
        console.log("Register ControllerSSS>>>", email)

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
        const newAdmin = await Admin.create({
            username: name,
            email: email,
            phone: phone,
            password: hashedPass
        })

        return res.status(201).json(newAdmin)

    } catch (err) {
        next(err)
    }

}



//login
exports.login = async (req, res, next) => {

    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            // return res.status(400).json({
            //     status:"error",
            //     message:"Please check email and password"
            // })

            throw {
                message: "Please check your Email !!",
                status: 401
            }


        }
        const validated = await bcrypt.compare(req.body.password, admin.password);
        if (!validated) {

            // return res.status(400).json({
            //     status:"error",
            //     message:"Please check email and password"
            // })
            throw {
                message: "Invalid password !!",
                status: 401
            }
        }

        const { password, ...others } = admin._doc;
        const token = signToken(admin._id);

        return res.status(200).json({
            token: token,
            ...others
        })

    } catch (err) {
        next(err)
    }

}


//Protect
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

    } else if (req.cookies.jwt) {

        token = req.cookies.jwt;
    }
    if (!token) {
        return res.status(401).json({
            message: "You are not logged in Plz log in to get access!!"
        })
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const this_user = await Admin.findById(decoded.userId);
    if (!this_user) {
        return res.status(401).json({
            message: "The user Belonging to this token does no longer exists"
        })
    }
    req.user = this_user;
    next();
}