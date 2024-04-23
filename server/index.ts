import express from "express";
import type { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const app: Express = express();
const port = 3001;

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("The MongoDB URI is not defined.");
}

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
