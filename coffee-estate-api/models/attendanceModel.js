const db = require('../config/db');

// Add single attendance
exports.addAttendance = async (attendance) => {
  const { labor_id, property_id, user_id, entry_date, created_by } = attendance;
  const [result] = await db.execute(
    `INSERT INTO Attendance (labor_id, property_id, user_id, entry_date, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [labor_id, property_id, user_id, entry_date, created_by]
  );
  return result;
};

// ✅ Add multiple attendance records in one query
exports.addManyAttendance = async (records) => {
  if (!records || records.length === 0) return;

  // Build placeholder for each record
  const values = records.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');

  // Push parameters in the same order as columns
  const params = [];
  records.forEach(r => {
    params.push(
      r.labor_id,
      r.property_id,
      r.user_id,
      r.entry_date,
      r.attendance_value, // ✅ store value like 1, 0.5, 0.25
      r.created_by
    );
  });

  const [result] = await db.execute(
    `INSERT INTO Attendance (labor_id, property_id, user_id, entry_date, attendance_value, created_by)
     VALUES ${values}`,
    params
  );

  return result;
}
