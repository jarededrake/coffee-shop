import express from "express";
import { MongoDatabase } from "../database/createDatabaseInstance.ts";
import type { InventoryItems } from "../interface/inventory.ts";

const router = express.Router();

router.get("/menu", async (req, res) => {
  try {
    const db = MongoDatabase.getInstance().getDb();
    const coffeeCollection = db.collection<InventoryItems>("coffee-inventory");
    const items = await coffeeCollection.find({}).toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

export default router;
