import express from 'express'
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());

// In-memory storage (replace with a database like MongoDB later)
let posts = [];

app.get('/api/blog', (req, res) => {
  res.json(posts);
});

app.post('/api/blog', (req, res) => {
  const { title, content, author } = req.body;
  const newPost = { id: Date.now(), title, content, author, date: new Date().toISOString() };
  posts.push(newPost);
  res.status(201).json(newPost);
});

module.exports = app;