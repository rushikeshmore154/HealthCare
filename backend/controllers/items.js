import Item from "../models/Item.js";

export const addItem = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, category, description, stock } = req.body;
    if (!name || !category || !description || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({ name, category, description, stock });
    await newItem.save();

    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get All Items (Only Hospital Admin)
export const getItems = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const items = await Item.find().populate("category", "name");
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get Single Item by ID (Only Hospital Admin)
export const getItemById = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { itemId } = req.params;
    const item = await Item.findById(itemId).populate("category", "name");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Update Item (Only Hospital Admin)
export const updateItem = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { itemId } = req.params;
    const { name, category, description, stock } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (name) item.name = name;
    if (category) item.category = category;
    if (description) item.description = description;
    if (stock !== undefined) item.stock = stock;

    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Delete an Item (Only Hospital Admin)
export const deleteItem = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { itemId } = req.params;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Item.findByIdAndDelete(itemId);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Increment Stock (Only Hospital Admin)
export const incrementStock = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { itemId } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid increment amount" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.stock += amount;
    await item.save();
    res
      .status(200)
      .json({ message: "Stock incremented successfully", stock: item.stock });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Decrement Stock (Only Hospital Admin)
export const decrementStock = async (req, res) => {
  try {
    if (req.user.role !== "hospital" && req.user.role !== "subAdmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { itemId } = req.params;
    const { amount } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (amount <= 0 || item.stock - amount < 0) {
      return res
        .status(400)
        .json({ message: "Invalid decrement amount or not enough stock" });
    }

    item.stock -= amount;
    await item.save();
    res
      .status(200)
      .json({ message: "Stock decremented successfully", stock: item.stock });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
