// server/utils/restoreBackup.js
const fs = require('fs');
const { BACKUP_FILE } = require('./backup');
const Message = require('../models/message');

async function restoreBackup() {
  if (!fs.existsSync(BACKUP_FILE)) return;

  const data = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
  if (!Array.isArray(data) || data.length === 0) return;

  let restored = 0;
  for (const msg of data) {
    const exists = await Message.findOne({
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      createdAt: msg.createdAt
    });
    if (!exists) {
      await Message.create(msg);
      restored++;
    }
  }

  fs.writeFileSync(BACKUP_FILE, '[]', 'utf8');
  console.log(`✅ Restored ${restored} messages from backup`);
}

module.exports = restoreBackup;
