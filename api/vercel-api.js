// Ensure it looks like this so Express can use it
const statsHandler = async (req, res) => {
  try {
    const token = process.env.VERCEL_AUTH_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;

    // Optional: Add a check to prevent unauthorized API hits
    // if (req.headers.referer && !req.headers.referer.includes('yourdomain.com')) {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    const result = await fetch(
      `https://api.vercel.com/v1/analytics/stats?projectId=${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    const data = await result.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Vercel stats' });
  }
};

export default statsHandler;