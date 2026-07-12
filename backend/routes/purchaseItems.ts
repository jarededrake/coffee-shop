import express from "express";
import type { Request, Response } from "express";
import { MongoDatabase } from "../database/createDatabaseInstance.ts";
import { ObjectId } from "mongodb";
import type { OrderedItems } from "../interface/order.ts";

const router = express.Router();

router.post(
  "/purchase",
  async (req: Request<{}, {}, OrderedItems[]>, res: Response) => {
    const payload = req.body;
    const client = await MongoDatabase.getInstance().getMongoClient();
    const session = client.startSession();
    session.startTransaction();

    try {
      const db = MongoDatabase.getInstance().getDb();
      const operations = payload.map((item) => ({
        updateOne: {
          filter: {
            _id: new ObjectId(item._id),
            name: item.name,
          },
          update: {
            $inc: { quantity: -item.quantity },
          },
        },
      }));
      await db
        .collection("coffee-inventory")
        .bulkWrite(operations, { session });
      await session.commitTransaction();

      res.status(200).json({ message: "purchase successful" });
    } catch (error) {
      await session.abortTransaction();

      res
        .status(500)
        .json({ message: "An error occured during the transaction: " + error });
    } finally {
      await session.endSession();
    }
  }
);

export default router;
