// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(cors());

// === API Routes ===
const blogHandler = (await import('./pages/api/blog.js')).default;
const contactHandler = (await import('./pages/api/contact.js')).default;

app.use('/api/blog', blogHandler);
app.use('/api/contact', contactHandler);

// === Serve Static Files (Vite build output) ===
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? path.join(__dirname, 'dist') : path.join(__dirname, 'public');

app.use(express.static(basePath));

// === SPA Fallback ===
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(basePath, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});