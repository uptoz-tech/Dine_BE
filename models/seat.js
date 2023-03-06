const mongoose = require('mongoose');

var SeatSchema = mongoose.Schema({
    table_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table',
    },
    seat_no: {
        type: Number,
        required: false
    },
    seat_count: {
        type: Number,
        required: true
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
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

var Seat = mongoose.model('seat', SeatSchema);

module.exports = Seat;