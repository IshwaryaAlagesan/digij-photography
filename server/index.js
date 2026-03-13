require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// CORS — allow frontend origins
const origins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim());
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/customers',  require('./routes/customers'));
app.use('/api/leads',      require('./routes/leads'));
app.use('/api/deals',      require('./routes/deals'));
app.use('/api/activities', require('./routes/activities'));

// Start
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });
