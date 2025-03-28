import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'posts',
    timestamps: false,
  }
);

// Sync database
sequelize.sync();

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Posts API!' });
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new post
app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a post by ID
app.put('/posts/:id', async (req, res) => {
  try {
    await Post.update(req.body, { where: { id: req.params.id } });
    const updatedPost = await Post.findByPk(req.params.id);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
