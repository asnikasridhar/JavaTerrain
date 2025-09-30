const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendanceController');

router.post('/attendance/add', AttendanceController.addAttendance);       
router.post('/attendance/addMany', AttendanceController.addManyAttendance); 
//router.get('/all', AttendanceController.getAllAttendance);
//router.put('/update/:id', AttendanceController.updateAttendance);
//router.delete('/delete/:id', AttendanceController.deleteAttendance);

module.exports = router;
