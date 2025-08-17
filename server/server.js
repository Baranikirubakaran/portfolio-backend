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

// ✅ MongoDB Connect with Retry
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    // Restore backup data if exists
    await restoreBackup();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);

    // Retry after 30 seconds
    console.log('⏳ Retrying MongoDB connection in 30 seconds...');
    setTimeout(connectDB, 30000);
  }
}

// Call DB connection
connectDB();

// Routes
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Server started on http://localhost:${PORT}`);
});
