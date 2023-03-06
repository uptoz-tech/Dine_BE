const express = require('express')
const asyncHandler = require('../middlewares/async')
const adminAuth = require('../middlewares/adminAuth')
const AdminController = require('../controllers/admin')

const adminController = new AdminController();

const router = express.Router()

router.post('/create',  asyncHandler(adminController.create))
router.post('/list', asyncHandler(adminController.list))
router.post('/login', asyncHandler(adminController.login))
router.get('/logout',  asyncHandler(adminController.logout))
router.patch('/update',adminAuth, asyncHandler(adminController.update))
router.delete('/delete', asyncHandler(adminController.delete))

module.exports = router