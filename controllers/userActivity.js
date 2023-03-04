const user = require('../models/user');
const UserActivity = require('../models/UserActivity')

class UserActivityController {
    constructor() { }

    async create(req, res) {
        const newUserActivity = await new UserActivity(req.body).save();
        return res.status(200).json({ success: true, data: newUserActivity, message: "New UserActivity Created" });
    }

    async list(req, res) {
        let table=await user.find({
            $or: 
            [
            { "name": { $regex: `${req.body.name}`, $options: 'i' } },
            { "logintime": { $regex: `${req.body.role}`, $options: 'i' } },
            { "os": { $regex: `${req.body.email}`, $options: 'i' } },
            { "sessiontiming": { $regex: `${req.body.email}`, $options: 'i' } },
            ]
        })
        let list = await UserActivity.find({status:1}).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
        let count = await UserActivity.find({ $or: 
            [
            { "name": { $regex: `${req.body.name}`, $options: 'i' } },
            { "logintime": { $regex: `${req.body.role}`, $options: 'i' } },
            { "os": { $regex: `${req.body.email}`, $options: 'i' } },
            { "sessiontiming": { $regex: `${req.body.email}`, $options: 'i' } },
            ]
        }).countDocuments()

        let output = {
            table,
            list,
            count,
        }
            return res.status(200).json({ success: true, data: output, message: "UserActivity Listed !" });
    }

    async listOne(req, res) {
            console.log(req.body)
            
            const findOne = await  UserActivity.findById(req.body._id)
            console.log(findOne)
            return res.status(200).json({ data: findOne, message: "New UserActivity finded" });
    }

    async update(req, res) {
        let update = await  UserActivity.updateOne({ _id: req.body._id }, req.body)
        return res.status(200).json({ success: true, data: update, message: "new UserActivity updated" });
    }

    async delete(req, res) {
        console.log(req.body)
        let remove = await UserActivity.deleteOne({_id:req.body._id})
        return res.status(200).json({ success: true, data: remove, message: "new UserActivity updated" });
    }
    

    
}


module.exports = UserActivityController 
