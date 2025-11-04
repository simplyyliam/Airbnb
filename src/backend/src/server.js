import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
const Http = http;

const PORT = import.meta.env.VITE_PORT;

async () => {
  try {
    await connectDB(import.meta.env.VITE_MONGO_URI);
    const server = Http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};
