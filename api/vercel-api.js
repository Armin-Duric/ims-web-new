// api/vercel-api.js
export default async function statsHandler(req, res) {
  try {
    const token = process.env.VERCEL_AUTH_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;

    // Use the units type and a 7-day 'from' timestamp
    const from = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    // Exact URL format Vercel expects
    const url = `https://api.vercel.com/v1/analytics/stats?projectId=${projectId}&from=${from}&types=units`;

    const response = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Vercel Rejected Request:", data); // Check terminal again after this change
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}