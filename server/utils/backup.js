// server/utils/backup.js
const fs = require('fs');
const path = require('path');

const BACKUP_FILE = path.join(__dirname, '../backup_messages.json');
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

function ensureBackupFile() {
  if (!fs.existsSync(BACKUP_FILE)) {
    fs.writeFileSync(BACKUP_FILE, '[]', 'utf8');
  }
}

function rotateIfBig() {
  const stats = fs.statSync(BACKUP_FILE);
  if (stats.size >= MAX_SIZE) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.renameSync(BACKUP_FILE, BACKUP_FILE.replace('.json', `-${stamp}.json`));
    fs.writeFileSync(BACKUP_FILE, '[]', 'utf8');
  }
}

function saveToBackup(data) {
  ensureBackupFile();
  rotateIfBig();
  const existing = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
  existing.push(data);
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

module.exports = { BACKUP_FILE, saveToBackup };
