import express from "express";
import {
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    incrementStock,
    decrementStock
} from "../controllers/items.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

// 📌 Inventory routes (Only accessible by hospital admin)
router.post("/create", authentication, addItem);
router.get("/all", authentication, getItems);
router.get("/:itemId", authentication, getItemById);
router.put("/update/:itemId", authentication, updateItem);
router.delete("/delete/:itemId", authentication, deleteItem);
router.put("/increment/:itemId", authentication, incrementStock);
router.put("/decrement/:itemId", authentication, decrementStock);

export default router;
