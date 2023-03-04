const Seat = require('../models/seat')

class SeatController {
    constructor() { }

    async create(req, res) {
        console.log(req.body,'body data')
        const create = await new Seat(req.body).save();
        return res.status(200).json({ success: true, data: create, message: "New Seat Created" });
    }

    async list(req, res) {
        let list = await Seat.find({ deleted: false });
        let count = await Seat.find({ deleted: false }).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Seat Listed !" });
    }

    async update(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { subject: req.body.subject };
        console.log(update, filter, 'sfilje')
        let doc = await Seat.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Seat Listed updated !" });
    }

    async delete(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { deleted: true };
        let doc = await Seat.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Seat Listed deleted!" });
    }
}

module.exports = SeatController