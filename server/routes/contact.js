// server/routes/contact.js
const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const sendEmail = require('../utils/sendEmail');
const { saveToBackup } = require('../utils/backup');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Send email first
  try {
    await sendEmail({ name, email, subject, message });
  } catch (e) {
    console.error('Email send failed:', e.message);
  }

  // Save to DB
  try {
    await Message.create({ name, email, subject, message });
    res.json({ success: true, msg: 'Message saved to DB' });
  } catch (err) {
    console.error('DB save failed, saving to backup:', err.message);
    saveToBackup({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    });
    res.status(202).json({ success: true, backup: true, msg: 'Saved to backup file' });
  }
});

module.exports = router;
