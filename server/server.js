// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contact');
const cors = require('cors');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log("MONGO_URI from env:", process.env.MONGO_URI); // Debug

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/contact', contactRoutes);

// Home route → serve mkk_portfolio.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/mkk_portfolio.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Server started on http://localhost:${PORT}`);
});
