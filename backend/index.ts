import http from "http";
import { bootstrap } from "./database/connectToDataBase.ts";
import { createApp } from "./app.ts";
import { startWebSocketServer } from "./websocket/startWebSocketServer.ts";

async function startServer() {
  await bootstrap();
  const app = createApp();
  const server = http.createServer(app);

  startWebSocketServer(server);

  const PORT = process.env["PORT"] || 5001;

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
startServer();
