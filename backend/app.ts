import express from "express";
import cors from "cors";
import getMenuItems from "./routes/getCoffeeInventory.ts";
import purchaseItems from "./routes/purchaseItems.ts";
import queue from "./routes/enqueue.ts";
import viewQueue from "./routes/getQueue.ts";
import dequeue from "./routes/dequeue.ts";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

  app.use("/api", getMenuItems);
  app.use("/api", purchaseItems);
  app.use("/api", queue);
  app.use("/api", viewQueue);
  app.use("/api", dequeue);

  return app
}
