const express = require('express')
const asyncHandler = require('../middlewares/async')

const tableController = require('../controllers/table')

const TableController = new tableController();

const router = express.Router()

router.post('/Table/create',  asyncHandler(TableController.create))
router.post('/Table/list', asyncHandler(TableController.list))
router.post('/Table/update', asyncHandler(TableController.update))
router.post('/Table/delete', asyncHandler(TableController.delete))


module.exports = router