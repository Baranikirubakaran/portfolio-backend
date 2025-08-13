// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');
const restoreBackup = require('./utils/restoreBackup');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve client files
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/mkk_portfolio.html'));
});

// Connect DB
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    await restoreBackup();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
})();

// Routes
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Server started on http://localhost:${PORT}`);
});
