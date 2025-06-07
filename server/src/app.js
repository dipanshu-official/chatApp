import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
config();

import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});



app.use("/user", userRoute);
app.use("/api/message", messageRoute);

export default app;
