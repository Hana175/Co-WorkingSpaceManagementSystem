const { Space } = require("../models");

//get all spaces
const getSpaces = async (req, res) => {
  try {
    const spaces = await Space.findAll();
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: "Error fetching spaces", error });
  }
};

//admins only: add space
const addSpace = async (req, res) => {
   if (req.user.role !== "admin") {
     return res.status(403).json({ message: "Permission denied: Admins only" });
   }
  const { name, type, capacity, pricePerHour, availability } = req.body;
  try {
    const newSpace = await Space.create({
      name,
      type,
      capacity,
      pricePerHour,
      availability,
    });
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({ message: "Error adding space", error });
  }
};

//admins only can update space.
const updateSpace = async (req, res) => {
   if (req.user.role !== "admin") {
     return res.status(403).json({ message: "Permission denied: Admins only" });
   }
  const { id } = req.params;
  try {
    const updated = await Space.update(req.body, { where: { id } });
    if (updated[0]) {
      res.json({ message: "Space updated successfully" });
    } else {
      res.status(404).json({ message: "Space not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating space", error });
  }
};

//admins can delete space
const deleteSpace = async (req, res) => {
   if (req.user.role !== "admin") {
     return res.status(403).json({ message: "Permission denied: Admins only" });
   }
  const { id } = req.params;
  try {
    const deleted = await Space.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Space deleted successfully" });
    } else {
      res.status(404).json({ message: "Space not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting space", error });
  }
};
module.exports = { getSpaces, addSpace, updateSpace, deleteSpace };