// api/stats.js (formerly vercel-api.js)
export default async function handler(req, res) {
  const token = process.env.VERCEL_AUTH_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token) return res.status(500).json({ error: "No Token" });

  const url = `https://api.vercel.com/v1/analytics/stats?projectId=${projectId}&from=${Date.now() - 86400000}&types=units`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}