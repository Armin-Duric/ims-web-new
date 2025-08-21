import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const sql = neon(process.env.DATABASE_URL);

app.get('/api/blog', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM posts ORDER BY date DESC`;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
  }
});

app.post('/api/blog', async (req, res) => {
  const { title, content, author, links, date } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  try {
    const result = await sql`
      INSERT INTO posts (title, content, author, links, date)
      VALUES (${title}, ${content}, ${author}, ${links || '[]'}, ${date || new Date().toISOString()})
      RETURNING *
    `;
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post', details: err.message });
  }
});

app.put('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author, links } = req.body;
  if (!id || !title || !content || !author) {
    return res.status(400).json({ error: 'ID, title, content, and author are required' });
  }
  try {
    const result = await sql`
      UPDATE posts
      SET title = ${title}, content = ${content}, author = ${author}, links = ${links || '[]'}
      WHERE id = ${id}
      RETURNING *
    `;
    res.status(200).json(result[0] || null);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post', details: err.message });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});