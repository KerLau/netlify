import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 6969;

connectDB();

app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});
