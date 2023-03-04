const mongoose = require('mongoose');

var userActivitySchema = mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    logintime: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    sessiontiming: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
        
    },
}, { timestamps: true });

var UserActivity = mongoose.model('userActivity', userActivitySchema);

module.exports = UserActivity;