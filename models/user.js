const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Email Validation
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// PassWord Validation
var validatePassword = function(password) {
    //var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#()+-_\$%\^&\*])(?=.{8,})/;
    return strongRegex.test(password);
}


const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [false, 'please provide name'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please provide email.. email must'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email format'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        // validate: [validatePassword, 'Password Invalid format. At least 1 capital letter.., 1 lowercase letter.., 1 special character.., 1 numeric character..,'],
    },
    dob: {
        type: String,
        trim: true,
    },
    mobileNum: {
        type: Number,
        minlength: 10,
    },
    bio: {
        type: String
    },
    status: {
        type: Boolean,
    },
    otp: {
        type: Number
    }

}, { timestamps: true });

// Sign JWT and return
userScheme.methods.generateAuthToken = async function() {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token
}

// check email and password match
userScheme.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email:email })
    if (!user) {
        throw new Error('User Not Found. Kindly Register')
    }
    if (!user.password) {
        throw new Error('Invalid Credential')
    }
    const check = await bcrypt.compare(password, user.password)
    if (!check) {
        throw new Error('Invalid Credential')
    }
    return user
}

// Encrypt password using bcrypt
userScheme.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.confirmPassword = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('user', userScheme)

module.exports = User