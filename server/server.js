import { config } from "dotenv";
config();

import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import { initSocket } from "./src/socketIO/socket.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = initSocket(app); // attach socket.io to express app
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
