# Smart Water Management - Backend

A minimal Express.js server with MongoDB (via Mongoose) for the Smart Water Management app.

## Prerequisites
- Node.js 18+ (recommended) and npm
- A MongoDB instance (local or Atlas)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env` file from the example and set your connection string:
   ```bash
   copy .env.example .env   # Windows PowerShell: cp .env.example .env also works
   ```
   Edit `.env`:
   ```dotenv
   MONGO_URI=mongodb://127.0.0.1:27017/smartwater
   # PORT=5000
   ```

## Run
- Development (auto-restart with nodemon):
  ```bash
  npm run dev
  ```
- Production:
  ```bash
  npm start
  ```

The server will start on `http://localhost:5000` (or the port set in `PORT`).

## Endpoints
- `GET /api/health` — returns service status and current time

## Notes
- On startup, if `MONGO_URI` is missing, the server will log an error and continue running so you can still hit `/api/health`.
- When `MONGO_URI` is provided and reachable, you will see `MongoDB connected` in the console. Errors are logged with the message `MongoDB connection error:`.
