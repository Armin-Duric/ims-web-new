// pages/api/blog.js  (updated version)

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const { method } = req;
  const { id, page = 1, limit = 6 } = req.query; // default 6 posts per page

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const offset = (pageNum - 1) * limitNum;

  if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
    return res.status(400).json({ error: 'Invalid pagination parameters' });
  }

  // GET: Fetch paginated posts (for public)
  // If id is provided → single post (optional, useful for future)
  if (method === 'GET') {
    try {
      if (id) {
        // Optional: fetch single post by id
        const result = await sql`SELECT * FROM posts WHERE id = ${id}`;
        if (result.length === 0) return res.status(404).json({ error: 'Post not found' });
        return res.status(200).json(result[0]);
      }

      // Paginated list
      const posts = await sql`
        SELECT * FROM posts 
        ORDER BY date DESC 
        LIMIT ${limitNum} OFFSET ${offset}
      `;

      // Get total count for pagination metadata
      const totalResult = await sql`SELECT COUNT(*) FROM posts`;
      const total = parseInt(totalResult[0].count, 10);

      return res.status(200).json({
        posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
          hasNext: pageNum * limitNum < total,
          hasPrev: pageNum > 1,
        },
      });
    } catch (err) {
      console.error('GET error:', err);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  // === The rest (POST, PUT, DELETE) remains unchanged ===
  // But make sure they still work with id in query string

  if (method === 'POST') {
    const { title, content, author, links, date } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, author required' });
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
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  if (method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'ID required' });
    const { title, content, author, links } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, author required' });
    }
    try {
      const result = await sql`
        UPDATE posts
        SET title = ${title}, content = ${content}, author = ${author}, links = ${links ? JSON.stringify(links) : '[]'}
        WHERE id = ${id}
        RETURNING *
      `;
      if (result.length === 0) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json(result[0]);
    } catch (err) {
      console.error('PUT error:', err);
      return res.status(500).json({ error: 'Failed to update post' });
    }
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'ID required' });
    try {
      const result = await sql`DELETE FROM posts WHERE id = ${id} RETURNING *`;
      if (result.length === 0) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
      console.error('DELETE error:', err);
      return res.status(500).json({ error: 'Failed to delete post' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).json({ error: `Method ${method} Not Allowed` });
}