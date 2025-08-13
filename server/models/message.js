const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    }
  }
});

module.exports = mongoose.model('Message', messageSchema);
