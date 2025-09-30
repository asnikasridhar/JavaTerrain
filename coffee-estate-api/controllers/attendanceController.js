const Attendance = require('../models/attendanceModel');

// Add one
exports.addAttendance = async (req, res) => {
  try {
    const { labor_id, property_id, user_id, entry_date, created_by } = req.body;
    const result = await Attendance.addAttendance({ labor_id, property_id, user_id, entry_date, created_by });
    res.json({ message: 'Attendance added successfully', attendance_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add attendance' });
  }
};

// ✅ Add many
exports.addManyAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    if (!records || records.length === 0) {
      return res.status(400).json({ error: "No attendance records provided" });
    }

    const result = await Attendance.addManyAttendance(records);
    res.json({ message: "Attendance inserted successfully", result });
  } catch (err) {
    console.error("Error adding attendance:", err);
    res.status(500).json({ error: "Failed to insert attendance" });
  }
};
