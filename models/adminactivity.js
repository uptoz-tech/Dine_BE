const mongoose = require('mongoose');

var AdminActivitySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
      },
    devicename:{
        type: String,
        required: true
    },
    browser: {
        type: String,
        required: true
    },
    os:{
        type: String,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    version:{
        type: String,
        required: true
    }

    
}, { timestamps: true });

var AdminActivity = mongoose.model('AdminActivity', AdminActivitySchema);

module.exports = AdminActivity;