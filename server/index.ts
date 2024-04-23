import express from "express";
import type { Express, Request, Response } from "express";
import mongoose from "mongoose";

const app: Express = express();
const port = 3001;

const uri =
  "mongodb+srv://0711dr5:O841sfqrMH9HlcxD@cluster0.ilvc0j8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
try {
  mongoose.connect(uri);
} catch (error) {
  console.error(error);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
