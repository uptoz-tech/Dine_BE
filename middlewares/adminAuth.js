const jwt = require('jsonwebtoken')

const Admin = require('../models/admin')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token,'auth token')
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode,'decide')
        const admin = await Admin.findOne({ _id: decode._id,role:'ADMIN'}).select('+password');
        console.log(admin,'ifadmin condition')
        if (!admin) {
            throw new Error('Incorrect Credentials')
        }
        if (admin.status == false) {
            res.clearCookie('token')
            throw new Error('Access Denied')
        }

        req.token = token
        req.admin = admin
        console.log(token,'token---atuth')
        console.log(req.admin,'admin')
        if(req.params.user_id){
            const user = await User.findOne({ _id: req.params.user_id })
            if (!user) {
                return res.status(200).send({ success: false, message: 'User Not Found' })
            }
            req.user = user;
        }
        next()

    } catch (error) {
        res.status(401).send({ success: false, message: 'Logged Out,Kindly Login' })
    }
}

module.exports = auth