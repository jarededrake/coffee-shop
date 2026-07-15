import { WebSocketServer, WebSocket } from "ws";
import { MongoDatabase } from "../database/createDatabaseInstance.ts";
import type { Server } from "http";

export function startWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ server });
  const clients = new Set<WebSocket>();

  wss.on("connection", async (ws) => {
    clients.add(ws);
    console.log("Client connected");

    const db = MongoDatabase.getInstance().getDb()
    const currentQueue = await db
        .collection('people-queue')
        .find()
        .sort({ joinedAt: 1 })
        .toArray()
        
    ws.send(JSON.stringify({
        type: 'QUEUE_UPDATED',
        queue: currentQueue
    }))

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });
  });


  const events = MongoDatabase.getInstance().getEvents();

  events.on("databaseUpdate", async () => {
    const db = MongoDatabase.getInstance().getDb();
    const updatedQueue = await db
      .collection("people-queue")
      .find()
      .sort({ joinedAt: 1 })
      .toArray();
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "QUEUE_UPDATED",
            queue: updatedQueue,
          })
        );
      }
    }
  });
}
