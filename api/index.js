import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

app.use(cors({ origin: 'https://your-vercel-app.vercel.app' })); // Replace with your Vercel URL
app.use(express.json());

// MySQL connection using environment variables
export default async function handler(req, res) {
  let db;
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await db.connect();

    if (req.method === 'GET') {
      const [results] = await db.query('SELECT * FROM posts');
      res.status(200).json(results);
    } else if (req.method === 'POST') {
      const { title, content, author, date, links } = req.body;
      const [result] = await db.query(
        'INSERT INTO posts (title, content, author, date, links) VALUES (?, ?, ?, ?, ?)',
        [title, content, author, date, JSON.stringify(links)]
      );
      res.status(201).json({ id: result.insertId });
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { title, content, author, links } = req.body;
      await db.query(
        'UPDATE posts SET title = ?, content = ?, author = ?, links = ? WHERE id = ?',
        [title, content, author, JSON.stringify(links), id]
      );
      res.status(200).json({ message: 'Post updated' });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await db.query('DELETE FROM posts WHERE id = ?', [id]);
      res.status(200).json({ message: 'Post deleted' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (db) await db.end();
  }
}