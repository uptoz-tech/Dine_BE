const Table = require('../models/table')

class TableController {
    constructor() { }

    async create(req, res) {
        const create = await new Table(req.body).save();
        return res.status(200).json({ success: true, data: create, message: "New Table Created" });
    }

    async list(req, res) {
        let list = await Table.find({ deleted: false });
        let count = await Table.find({ deleted: false }).countDocuments();
        let output = {
            list,
            count,
        }
        return res.status(200).json({ success: true, data: output, message: "Table Listed !" });
    }

    async update(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { subject: req.body.subject };
        console.log(update, filter, 'sfilje')
        let doc = await Table.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Table Listed updated !" });
    }

    async delete(req, res) {
        const filter = { organisedby: req.body.organisedby };
        const update = { deleted: true };
        let doc = await Table.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        return res.status(200).json({ success: true, data: doc, message: "Table Listed deleted!" });
    }
}

module.exports = TableController