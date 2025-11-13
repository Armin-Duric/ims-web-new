// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// === API ROUTES (MUST BE FIRST) ===
const blogHandler = (await import('./pages/api/blog.js')).default;
const contactHandler = (await import('./pages/api/contact.js')).default;

app.use('/api/blog', blogHandler);
app.use('/api/contact', contactHandler);

// === Serve static files ===
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// === SPA FALLBACK (NO `*` ROUTE) ===
app.use((req, res, next) => {
  // Only serve index.html for non-API, non-static requests
  if (
    req.path.startsWith('/api/') ||
    req.path.includes('.') ||  // has file extension (css, js, png, etc.)
    req.method !== 'GET'
  ) {
    return next();
  }

  // Serve React index.html
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});