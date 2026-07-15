import express from "express";
import { MongoDatabase } from "../database/createDatabaseInstance.ts";
import { faker } from "@faker-js/faker";
import type { Customer } from "../interface/customer.ts";

const router = express.Router();

router.post("/queue", async (req, res) => {
  const userId = req.body.sessionId;

  const SUPPORTED_CURRENCIES = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "KRW",
    "BRL",
    "INR",
    "AED",
  ] as const;
  const currency = faker.helpers.arrayElement(SUPPORTED_CURRENCIES);

  try {
    const db = MongoDatabase.getInstance().getDb();
    const queueCollection = db.collection("people-queue");
    const budgetUSD = parseFloat(faker.finance.amount({ min: 5, max: 50 }));

    const existing = await queueCollection.findOne({ sessionId: userId })
    if (existing) {
      return res.status(200).json(existing); 
    }

    const newUser: Customer = {
      sessionId: userId,
      name: faker.person.fullName(),
      currency: currency,
      budget: budgetUSD,
      joinedAt: new Date(),
    };
    const result = await queueCollection.insertOne(newUser);
    res.status(201).json({ message: "Joined queue", id: result.insertedId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

export default router;
