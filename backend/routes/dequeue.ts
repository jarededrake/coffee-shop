import express from "express";
import { MongoDatabase } from "../database/createDatabaseInstance.ts";

const router = express.Router();

router.post("/dequeue", async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    const db = MongoDatabase.getInstance().getDb();
    const queueCollection = db.collection("people-queue");

    const deletedPerson = await queueCollection.findOneAndDelete({
      sessionId: sessionId,
    });

    if (!deletedPerson) {
      return res.status(404).json({ message: "User not found in queue" });
    }

    res.status(200).json({ message: "Dequeued successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
export default router;
