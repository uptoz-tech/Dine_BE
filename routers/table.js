const express = require('express')
const asyncHandler = require('../middlewares/async')

const tableController = require('../controllers/table')

const TableController = new tableController();

const router = express.Router()

router.post('/create',  asyncHandler(TableController.create))
router.post('/list', asyncHandler(TableController.list))
router.post('/update', asyncHandler(TableController.update))
router.post('delete', asyncHandler(TableController.delete))


module.exports = router