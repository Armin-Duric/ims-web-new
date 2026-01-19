import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import statsHandler from './api/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// 1. MIDDLEWARE FIRST
app.use(cors({
  origin: true, // Allows any local port to talk to the server
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// 2. API ROUTES (Define these explicitly BEFORE static/catch-all)
app.get('/api/stats', statsHandler);

// Dynamic imports for other handlers
const blogHandler = (await import('./api/blog.js')).default;
const contactHandler = (await import('./api/contact.js')).default;
const careersHandler = (await import('./api/careers.js')).default;
const patientLookupHandler = (await import('./api/patient-lookup.js')).default;

app.use('/api/blog', blogHandler);
app.use('/api/contact', contactHandler);
app.use('/api/careers', careersHandler);
app.use('/api/patient-lookup', patientLookupHandler);

// 3. STATIC FILES
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? path.join(__dirname, 'dist') : path.join(__dirname, 'public');
app.use(express.static(basePath));

// 4. CATCH-ALL (The "Universal" Fix)
// Instead of a complex Regex, use a simple middleware that excludes /api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

// If you still get PathErrors with '*', use this instead:
// app.get('/:any*', (req, res, next) => { ... })

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});