const Block = require('../models/blockModel');

// Create Block
exports.addBlock = async (req, res) => {
  try {
    const result = await Block.createBlock(req.body);
    res.status(201).json({ message: 'Block added successfully', block_id: result.insertId });
  } catch (err) {
    console.error('Error adding block:', err);
    res.status(500).json({ error: 'Failed to add block' });
  }
};

// Get Block by ID
exports.getBlockById = async (req, res) => {
  try {
    const block = await Block.getBlockById(req.params.id);
    if (!block) return res.status(404).json({ error: 'Block not found' });
    res.json(block);
  } catch (err) {
    console.error('Error retrieving block:', err);
    res.status(500).json({ error: 'Failed to retrieve block' });
  }
};

// Get Blocks by property_id
exports.getBlocksByPropertyId = async (req, res) => {
  try {
    const blocks = await Block.getBlocksByPropertyId(req.params.property_id);
    res.json(blocks);
  } catch (err) {
    console.error('Error retrieving blocks for property:', err);
    res.status(500).json({ error: 'Failed to retrieve blocks' });
  }
};

// Update Block
exports.updateBlock = async (req, res) => {
  try {
    const result = await Block.updateBlock(req.params.block_id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Block not found' });
    res.json({ message: 'Block updated successfully' });
  } catch (err) {
    console.error('Error updating block:', err);
    res.status(500).json({ error: 'Failed to update block' });
  }
};

// Delete Block
exports.deleteBlock = async (req, res) => {
  try {
    const result = await Block.deleteBlock(req.params.block_id);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Block not found' });
    res.json({ message: 'Block deleted successfully' });
  } catch (err) {
    console.error('Error deleting block:', err);
    res.status(500).json({ error: 'Failed to delete block' });
  }
};
