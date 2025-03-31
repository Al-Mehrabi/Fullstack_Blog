import express from "express";
import dotenv from "dotenv";
import client from "./db.js";
import cors from "cors"; // Import CORS
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors()); // use core
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    res.json({ message: "server is running" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const result = await client.query("select * from posts");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query("select * from posts where id= $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/posts", async (req, res) => {
  const { author, title, content, cover, date } = req.body;

  console.log("Received post data:", req.body);

  try {
    const result = await client.query(
      "INSERT INTO posts (author, title, content, cover, date) VALUES ($1, $2, $3, $4, $5)",
      [author, title, content, cover, date]
    );
    console.log("Post added successfully");
    res.status(201).send("Post added successfully");
  } catch (error) {
    console.error("Error inserting post:", error);
    res.status(500).send(`Error creating post: ${error.message}`);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await client.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount > 0) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send(err.message);
  }
});

