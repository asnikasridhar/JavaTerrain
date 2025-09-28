const RainDetails = require('../models/rainDetailsModel');

// Add rain detail
exports.addRainDetail = async (req, res) => {
  try {
    const result = await RainDetails.createRainDetail(req.body);
    res.json({ message: "Rain detail added successfully", result });
  } catch (err) {
    console.error("Error adding rain detail:", err);
    res.status(500).send("Error adding rain detail.");
  }
};

// Get all
exports.getAllRainDetails = async (req, res) => {
  try {
    const rows = await RainDetails.getAllRainDetails();
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error fetching rain details.");
  }
};

// Get by property_id
exports.getRainDetailsByProperty = async (req, res) => {
  try {
    const rows = await RainDetails.getRainDetailsByPropertyId(req.params.property_id);
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error fetching rain details.");
  }
};

// Get by ID
exports.getRainDetailById = async (req, res) => {
  try {
    const rain = await RainDetails.getRainDetailById(req.params.id);
    if (!rain) return res.status(404).send("Rain detail not found.");
    res.json(rain);
  } catch (err) {
    res.status(500).send("Error fetching rain detail.");
  }
};

// Update
exports.updateRainDetail = async (req, res) => {
  try {
    const result = await RainDetails.updateRainDetail(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).send("Rain detail not found.");
    res.json({ message: "Rain detail updated successfully" });
  } catch (err) {
    res.status(500).send("Error updating rain detail.");
  }
};

// Delete
exports.deleteRainDetail = async (req, res) => {
  try {
    const result = await RainDetails.deleteRainDetail(req.params.id);
    if (result.affectedRows === 0) return res.status(404).send("Rain detail not found.");
    res.json({ message: "Rain detail deleted successfully" });
  } catch (err) {
    res.status(500).send("Error deleting rain detail.");
  }
};
