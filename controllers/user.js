const User = require('../models/user')
const bcrypt = require('bcryptjs')

class UserController {
    constructor() {

    }

    async register(req, res) {

        if (req.body.password === req.body.confirmPassword) {
            const user = new User(req.body)
            await user.save();
            return res.status(201).send({ success: true, data: user._id, message: 'Successfully Register' })
        }
        res.status(401).send({ success: false, message: "Password Mismatch" })

    }


    async login(req, res) {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (user && user.status === false) {
            return res.status(401).send({ success: false, message: 'Your Account Has Been Disabled Please Contact Support Team ' })
        }
        const token = await user.generateAuthToken()
        return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }).json({ success: true, message: "Login Successful" })
  
    }


    async getUser(req, res) {

        const user = await User.findOne({ _id: req.user._id });
        res.status(200).send({ success: true, data: user, message: 'User Info' })

    }

    async forgotPassword(req, res){
        const user = await User.findOne({email: req.body.email})
        // user.mobileNum
      
            var digits = '0123456789';
            for (let i = 0; i < 4; i++ ) {
                let otp = digits[Math.floor(Math.random() * 10)];
            }
            console.log(otp);
            user.otp = otp
    }

    // async resetPassword(req, res){
    //     const user = await User.findOne({email:req.body.email})
    //     if(otp == user.otp){
    //         user.password = 
    //     }
    // }

    async logout(req, res, next) {

        const user = req.user
        res.clearCookie('token')
        await user.save()
        res.status(200).json({ success: true, message: 'Logout Success' })

    }
}

module.exports = UserController