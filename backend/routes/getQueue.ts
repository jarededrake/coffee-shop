import express from "express";
import { MongoDatabase } from "../database/createDatabaseInstance.ts";
import type { Customer } from "../interface/customer.ts";

const router = express.Router();

router.get("/view-queue", async (req, res) => {
  try {
    const db = MongoDatabase.getInstance().getDb();
    const queue = await db
      .collection("people-queue")
      .find()
      .sort({ joinedAt: 1 })
      .toArray();

    res.status(200).json(queue);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default router;
