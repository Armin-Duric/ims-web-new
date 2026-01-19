// api/stats.js
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export default async function statsHandler(req, res) {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;
    const credsJson = process.env.GOOGLE_CREDENTIALS_JSON;

    if (!propertyId || !credsJson) {
      return res.status(500).json({ error: 'Missing GA4 config (check env vars)' });
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: JSON.parse(credsJson),
    });

    const property = `properties/${propertyId}`;

    // 1. Aggregates (views, visitors, session duration, engagement for bounce) - current + previous in ONE call
    const [aggregateResponse] = await analyticsDataClient.runReport({
      property,
      dateRanges: [
        { startDate: '30daysAgo', endDate: 'today' },       // Current period
        { startDate: '60daysAgo', endDate: '31daysAgo' },   // Previous period
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
        { name: 'averageSessionDuration' },
        { name: 'sessions' },
        { name: 'engagedSessions' },
      ],
    });

    // 2. Top country (by unique users) - current period only
    const [topResponse] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
    });

    // Helper to safely get metric value
    const getVal = (metricValue, isFloat = false) => {
      const val = metricValue?.value || '0';
      return isFloat ? parseFloat(val) : parseInt(val, 10);
    };

    // Defaults if no data
    let views = 0, visitors = 0, avgSession = '0s', bounceChange = '0%', topRegion = 'N/A';
    let viewsChange = '+0%', visitorsChange = '+0%';

    if (aggregateResponse.rows && aggregateResponse.rows.length > 0) {
      const mv = aggregateResponse.rows[0].metricValues;

      // Current period (first 5 metrics)
      const currentViews = getVal(mv[0]);
      const currentVisitors = getVal(mv[1]);
      const currentAvgSec = getVal(mv[2], true);
      const currentSessions = getVal(mv[3]);
      const currentEngaged = getVal(mv[4]);

      // Previous period (next 5 metrics)
      const prevViews = getVal(mv[5]);
      const prevVisitors = getVal(mv[6]);
      const prevSessions = getVal(mv[8]);
      const prevEngaged = getVal(mv[9]);

      // Format current
      views = currentViews.toLocaleString();
      visitors = currentVisitors.toLocaleString();
      avgSession = currentAvgSec > 0 ? `${Math.floor(currentAvgSec / 60)}m ${Math.round(currentAvgSec % 60)}s` : '0s';

      // Bounce rates
      const currentBounce = currentSessions > 0 ? ((currentSessions - currentEngaged) / currentSessions) * 100 : 0;
      const prevBounce = prevSessions > 0 ? ((prevSessions - prevEngaged) / prevSessions) * 100 : 0;
      const bounceDelta = (currentBounce - prevBounce).toFixed(1);
      bounceChange = (bounceDelta > 0 ? '+' : '') + bounceDelta + '%';  // e.g., '-5.2%' if bounce decreased (good)

      // % changes (handle divide-by-zero)
      const calcPercentChange = (current, prev) => {
        if (prev === 0) return current > 0 ? '+100%' : '0%';
        const diff = ((current - prev) / prev) * 100;
        return (diff >= 0 ? '+' : '') + diff.toFixed(0) + '%';
      };

      viewsChange = calcPercentChange(currentViews, prevViews);
      visitorsChange = calcPercentChange(currentVisitors, prevVisitors);
    }

    // Top region
    if (topResponse.rows && topResponse.rows.length > 0) {
      topRegion = topResponse.rows[0].dimensionValues[0].value || 'N/A';
    }

    // Final data matching your dashboard exactly
    const data = {
      views,
      viewsChange,
      visitors,
      visitorsChange,
      avgSession,
      bounceRate: bounceChange,  // Used as "change" on session card
      topRegion,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('GA4 API Error:', error);
    // Fallback to zeros on error (so dashboard doesn't break)
    res.status(200).json({
      views: '0',
      viewsChange: '+0%',
      visitors: '0',
      visitorsChange: '+0%',
      avgSession: '0s',
      bounceRate: '0%',
      topRegion: 'N/A',
    });
  }
}