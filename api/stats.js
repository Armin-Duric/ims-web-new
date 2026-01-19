// api/stats.js
export default async function statsHandler(req, res) {
  try {
    const token = process.env.VERCEL_AUTH_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;

    if (!token || !projectId) {
        return res.status(500).json({ error: "Missing Env Vars" });
    }

    // 1. We must provide a 'from' date (e.g., last 30 days)
    // 2. We must provide 'types' (what data we want)
    const from = Date.now() - (30 * 24 * 60 * 60 * 1000); 
    
    const url = `https://api.vercel.com/v1/analytics/stats?projectId=${projectId}&from=${from}&types=top_paths,devices,operating_systems`;

    const result = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = await result.json();

    if (!result.ok) {
        // This will now show you the EXACT reason Vercel is unhappy in your Vercel Logs
        console.error("Vercel API Error Detail:", data);
        return res.status(result.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}