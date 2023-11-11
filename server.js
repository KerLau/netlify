import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 6969;

connectDB();

app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});

app.use("/", router);
