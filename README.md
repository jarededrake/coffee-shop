# Caliola Café ☕
### Where every sip is mission critical

A real-time virtual coffee shop built as a technical panel project for Caliola Engineering.

## Tech Stack

**Frontend:** React, TypeScript, Vite, Framer Motion  
**Backend:** Node.js, Express, TypeScript, WebSockets  
**Database:** MongoDB Atlas  
**Infrastructure:** Docker  

## Running the App

### Prerequisites
- Docker Desktop installed → https://www.docker.com/products/docker-desktop

### Setup
1. Save the `docker-compose.yml` file to a folder
2. Open terminal in that folder
3. Run:
```bash
docker-compose up
```
4. Open http://localhost:5173 in your browser

### Multiple Users
Each person opens http://localhost:5173 in their own browser tab or machine.
Customers enter one at a time — others wait in the real-time queue.

## Features
- Real-time queue with WebSocket and MongoDB Change Streams
- Random budget assigned in one of 8 global currencies
- Inventory management with atomic transactions preventing overselling
- Currency conversion using Intl.NumberFormat
- Animated queue updates with Framer Motion
- Docker containerized for easy setup