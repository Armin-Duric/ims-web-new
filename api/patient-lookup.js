// pages/api/patient-lookup.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { lastName, firstName, dob } = req.body;

  if (!lastName || !firstName || !dob) {
    return res.status(400).json({ 
      error: 'Last name, first name, and date of birth are required' 
    });
  }

  try {
    // Build "Last, First" search string to match DB format
    const nameSearch = `${lastName.trim()}, ${firstName.trim()}`;

    const patients = await sql`
      SELECT name, clinic, balance, chart_number, injury_date
      FROM patient_bills 
      WHERE LOWER(name) LIKE LOWER(${nameSearch + '%'})
        AND dob = ${dob}
      ORDER BY created_at DESC
    `;

    if (patients.length === 0) {
      return res.status(404).json({ 
        error: 'No records found for this name and date of birth. Please check spelling and try again.' 
      });
    }

    res.status(200).json({ patients });
  } catch (error) {
    console.error('Lookup error:', error);
    res.status(500).json({ error: 'Database error. Please try again later.' });
  }
}