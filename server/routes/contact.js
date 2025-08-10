const express = require('express');
const router = express.Router();
const Message = require('../models/message'); // Correct capitalization
const nodemailer = require('nodemailer');
require('dotenv').config();

// @route   POST /api/contact
// @desc    Handle contact form submission
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // ✅ Step 1: Save to MongoDB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // ✅ Step 2: Send Email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message from Portfolio: ${subject}`,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message saved & email sent successfully ✅' });
  } catch (err) {
    console.error('❌ Server Error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
