// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const careersHandler = (await import('./api/careers.js')).default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json({limit: '10mb'}));
app.use(cors());

// === API Routes ===
const blogHandler = (await import('./api/blog.js')).default;
const contactHandler = (await import('./api/contact.js')).default;

app.use('/api/blog', blogHandler);
app.use('/api/contact', contactHandler);

// === Serve Static Files (Vite build output) ===
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? path.join(__dirname, 'dist') : path.join(__dirname, 'public');

app.use(express.static(basePath));

app.use('/api/careers', careersHandler);

// Catch-all for SPA routing – must be the very last route
app.use((req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(basePath, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});