import express from "express";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello Team!");
});
