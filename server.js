import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 6969;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});

app.use("/api/users", userRoutes);
