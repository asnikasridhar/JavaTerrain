const Block = require('../models/blockModel');

exports.createBlock = async (req, res) => {
  try {
    const block = req.body;
    const result = await Block.createBlock(block);
    res.status(201).json({ message: 'Block created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating block', error });
  }
};

exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await Block.getAllBlocks();
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blocks', error });
  }
};

exports.getBlockById = async (req, res) => {
  try {
    const id = req.params.id;
    const block = await Block.getBlockById(id);
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    res.status(200).json(block);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching block', error });
  }
};

exports.getBlocksByPropertyId = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const blocks = await Block.getBlocksByPropertyId(propertyId);
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blocks by property', error });
  }
};

exports.updateBlock = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Block.updateBlock(id, data);
    res.status(200).json({ message: 'Block updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating block', error });
  }
};

exports.deleteBlock = async (req, res) => {
  try {
    const id = req.params.id;
    await Block.deleteBlock(id);
    res.status(200).json({ message: 'Block deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting block', error });
  }
};
