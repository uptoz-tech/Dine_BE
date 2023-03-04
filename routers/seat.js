const express = require('express')
const asyncHandler = require('../middlewares/async')

const seatController = require('../controllers/seat')

const SeatController = new seatController();

const router = express.Router()

router.post('/create',  asyncHandler(SeatController.create))
router.post('/list', asyncHandler(SeatController.list))
router.post('/update', asyncHandler(SeatController.update))
router.post('delete', asyncHandler(SeatController.delete))


module.exports = router