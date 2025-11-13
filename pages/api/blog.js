// pages/api/blog.js
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const { method } = req;

  // GET: Fetch all posts
  if (method === 'GET') {
    try {
      const result = await sql`SELECT * FROM posts ORDER BY date DESC`;
      return res.status(200).json(result);
    } catch (err) {
      console.error('GET error:', err);
      return res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
    }
  }

  // POST: Create new post
  if (method === 'POST') {
    const { title, content, author, links, date } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    try {
      const result = await sql`
        INSERT INTO posts (title, content, author, links, date)
        VALUES (${title}, ${content}, ${author}, ${links ? JSON.stringify(links) : '[]'}, ${date || new Date().toISOString()})
        RETURNING *
      `;
      return res.status(201).json(result[0]);
    } catch (err) {
      console.error('POST error:', err);
      return res.status(500).json({ error: 'Failed to create post', details: err.message });
    }
  }

  // PUT: Update post by ID
  if (method === 'PUT') {
    const { id } = req.query; // Next.js uses req.query for dynamic routes
    const { title, content, author, links } = req.body;

    if (!id || !title || !content || !author) {
      return res.status(400).json({ error: 'ID, title, content, and author are required' });
    }

    try {
      const result = await sql`
        UPDATE posts
        SET title = ${title}, content = ${content}, author = ${author}, links = ${links ? JSON.stringify(links) : '[]'}
        WHERE id = ${id}
        RETURNING *
      `;
      if (result.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(result[0]);
    } catch (err) {
      console.error('PUT error:', err);
      return res.status(500).json({ error: 'Failed to update post', details: err.message });
    }
  }

  // DELETE: Delete post by ID
  if (method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    try {
      const result = await sql`DELETE FROM posts WHERE id = ${id} RETURNING *`;
      if (result.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
      console.error('DELETE error:', err);
      return res.status(500).json({ error: 'Failed to delete post', details: err.message });
    }
  }

  // Method Not Allowed
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${method} Not Allowed` });
}