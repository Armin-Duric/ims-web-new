// api/careers.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 1. ADD 'PUT' TO CORS HEADERS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const posts = await sql`SELECT * FROM jobs ORDER BY created_at DESC`;
      return res.status(200).json(posts);
    }

    // 2. ADD PUT METHOD FOR UPDATES
    if (req.method === 'PUT') {
      const { id } = req.query;
      const { position, description, requirements, benefits, location, applyEmail } = req.body;
      
      const result = await sql`
        UPDATE jobs 
        SET 
          position = ${position}, 
          description = ${description}, 
          requirements = ${JSON.stringify(requirements)}, 
          benefits = ${JSON.stringify(benefits)}, 
          location = ${location}, 
          apply_email = ${applyEmail}
        WHERE id = ${id}
        RETURNING *`;
      
      return res.status(200).json(result[0]);
    }

    if (req.method === 'POST') {
      const { position, description, requirements, benefits, location, applyEmail } = req.body;
      const result = await sql`
        INSERT INTO jobs (position, description, requirements, benefits, location, apply_email)
        VALUES (
          ${position}, 
          ${description}, 
          ${JSON.stringify(requirements)}, 
          ${JSON.stringify(benefits || [])}, 
          ${location}, 
          ${applyEmail}
        )
        RETURNING *`;
      return res.status(201).json(result[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`DELETE FROM jobs WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: error.message });
  }
}