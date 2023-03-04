const mongoose = require('mongoose');

var SeatSchema = mongoose.Schema({
    organisedby: {
        type: String,
        required: false,
    },
    from: {
        type: Date,
        required: false
    },
    to: {
        type: Date,
        required: false,
        // 0 - created, 1 - pending, 2 - completed , 3 - hold
    },
    duration: {
        type: String,
        required: false,
    },
    // members: {
    //     type: Array,
    //     required: false
    // },
    subject: {
        type:String,
        required:false
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

var Seat = mongoose.model('seat', SeatSchema);

module.exports = Seat;