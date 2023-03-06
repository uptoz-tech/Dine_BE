const Admin = require('../models/admin');
const User = require('../models/user');
const os = require('os');
const AdminActivity = require('../models/adminactivity');

class AdminController {
  constructor() { }

  async create(req, res) {
    const admin = await new Admin(req.body).save();

    return res.status(200).json({ success: true, data: admin, message: "New Admin Created" });
  }

  async login(req, res) {
    const admin = await Admin.findOne({ email: req.body.email, password: req.body.password });
    if (admin) {
      const u = req.useragent;
      let data = await new AdminActivity({
        devicename: os.hostname(),
        browser: u.browser,
        os: u.isAndroid ? u.platform : u.os,
        platform: u.platform,
        version: u.version
      }).save();
      console.log(data, 'data')
      const token = await admin.generateAuthToken();
      console.log(token, 'token')
      return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 15, httpOnly: false }).json({ success: true, data: admin, message: 'Login Successful' })
    } else {
      return res.status(401).send({ success: false, message: 'Invalid Credentials' })
    }
  }

  async logout(req, res) {
    res.clearCookie('token')
    res.status(200).json({ success: true, message: 'Logout Success' })
  }

  async list(req, res) {
    let list = await Admin.find({
      $or: [{ "name": { $regex: `${req.body.name}`, $options: 'i' } },
      { "role": { $regex: `${req.body.role}`, $options: 'i' } },
      { "email": { $regex: `${req.body.email}`, $options: 'i' } },
      { "password": { $regex: `${req.body.email}`, $options: 'i' } }
      ]
    }).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
    let count = await await Admin.find({
      $or: [{ "name": { $regex: `${req.body.name}`, $options: 'i' } },
      { "role": { $regex: `${req.body.role}`, $options: 'i' } },
      { "email": { $regex: `${req.body.email}`, $options: 'i' } },
      { "password": { $regex: `${req.body.email}`, $options: 'i' } }]
    }).countDocuments();
    let output = {
      list,
      count,
    }
    return res.status(200).json({ success: true, data: output, message: "Admin Listed !" });
  }
  async list(req, res) {
    let list = await User.find({
      $or:
      [
      { "firstName": { $regex: `${req.body.name}`, $options: 'i' } },
      { "lastName": { $regex: `${req.body.name}`, $options: 'i' } },
      { "userType": { $regex: `${req.body.name}`, $options: 'i' } },
      { "roleType": { $regex: `${req.body.role}`, $options: 'i' } },
      { "logInStatus": { $regex: `${req.body.role}`, $options: 'i' } },
      { "email": { $regex: `${req.body.email}`, $options: 'i' } },
      { "password": { $regex: `${req.body.email}`, $options: 'i' } }
      ]
    }).skip(req.body.pageNumber > 0 ? ((req.body.pageNumber - 1) * req.body.limit) : 0).limit(req.body.limit);
    let count = await await User.find({
      $or:
      [
      { "firstName": { $regex: `${req.body.name}`, $options: 'i' } },
      { "lastName": { $regex: `${req.body.name}`, $options: 'i' } },
      { "userType": { $regex: `${req.body.name}`, $options: 'i' } },
      { "roleType": { $regex: `${req.body.role}`, $options: 'i' } },
      { "logInStatus": { $regex: `${req.body.role}`, $options: 'i' } },
      { "email": { $regex: `${req.body.email}`, $options: 'i' } },
      { "password": { $regex: `${req.body.email}`, $options: 'i' } }
      ]
    }).countDocuments();
    let output = {
      list,
      count,
    }
    return res.status(200).json({ success: true, data: output, message: "Admin Listed !" });
  }

  async update(req, res) {
    let update = await Admin.updateOne({ _id: req.body._id }, req.body);
    return res.status(200).json({ success: true, data: update, message: "Admin Updated" })

  }
  async delete(req, res) {
    let remove = await Admin.deleteOne(req.body._id)
    return res.status(200).json({ success: true, data: remove, message: "Admin Deleted" })
  }
}

module.exports = AdminController