import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 6969;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});
