import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [labors, setLabors] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [propertyId] = useState(1);
  const [userId] = useState(1);

  const API_URL = "http://localhost:3000/api";

  // ✅ Generate current month's days
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(year, month, i + 1);
    return day.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  // ✅ Fetch labors on mount
  useEffect(() => {
    axios
      .get(`${API_URL}/labors-prop/${propertyId}`)
      .then((res) => {
        setLabors(res.data);

        // Initialize attendance state with empty values
        const initialAttendance = {};
        res.data.forEach((l) => {
          initialAttendance[l.labor_id] = {};
          dates.forEach((date) => {
            initialAttendance[l.labor_id][date] = "";
          });
        });
        setAttendance(initialAttendance);
      })
      .catch((err) => console.error("Error fetching labors:", err));
  }, [propertyId]);

  // ✅ Handle input change (daily attendance like 1, 0.5, 0.25)
  const handleInputChange = (labor_id, date, value) => {
    // Only allow numbers, 0, 0.25, 0.5, 1
    const validValue = value === "" ? "" : parseFloat(value) || "";
    setAttendance((prev) => ({
      ...prev,
      [labor_id]: {
        ...prev[labor_id],
        [date]: validValue,
      },
    }));
  };

  // ✅ Submit all attendance at once
  const submitAttendance = () => {
    const payload = [];

    labors.forEach((l) => {
      dates.forEach((date) => {
        const val = attendance[l.labor_id][date];
        if (val !== "" && val !== 0) {
          payload.push({
            labor_id: l.labor_id,
            property_id: propertyId,
            user_id: userId,
            entry_date: date,
            attendance_value: val, // 1, 0.5, 0.25
            created_by: "Admin",
          });
        }
      });
    });

    if (payload.length === 0) {
      alert("⚠️ No attendance data to submit!");
      return;
    }

    axios
      .post(`${API_URL}/attendance/addMany`, { records: payload })
      .then(() => alert("✅ Attendance submitted successfully!"))
      .catch((err) => console.error("❌ Error submitting attendance:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Attendance (Daily - {today.toLocaleString("default", { month: "long" })}{" "}
        {year})
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  minWidth: "120px",
                }}
              >
                Labor Name
              </th>
              {dates.map((date) => (
                <th
                  key={date}
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    minWidth: "40px",
                  }}
                >
                  {new Date(date).getDate()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labors.map((l) => (
              <tr key={l.labor_id}>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {l.name}
                </td>
                {dates.map((date) => (
                  <td
                    key={date}
                    style={{
                      border: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="number"
                      step="0.25"
                      min="0"
                      max="1"
                      value={attendance[l.labor_id]?.[date] || ""}
                      onChange={(e) =>
                        handleInputChange(l.labor_id, date, e.target.value)
                      }
                      style={{
                        width: "50px",
                        textAlign: "center",
                        padding: "3px",
                      }}
                      placeholder="day"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={submitAttendance}
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
