// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contact');
const cors = require('cors');

// Load environment variables from .env
dotenv.config({ path: __dirname + '/.env' });

console.log("MONGO_URI from env:", process.env.MONGO_URI);


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/contact', contactRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 Server is Running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server started on http://localhost:${PORT}`);
});
