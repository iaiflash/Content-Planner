const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\Asep\\OneDrive\\Gambar\\App Craft\\Folder Baru';

console.log('Checking:', targetDir);
if (fs.existsSync(targetDir)) {
  const files = fs.readdirSync(targetDir);
  console.log('Found ' + files.length + ' items in Folder Baru:');
  files.forEach(f => {
    const stat = fs.statSync(path.join(targetDir, f));
    console.log(f + (stat.isDirectory() ? ' [DIR]' : ' (' + Math.round(stat.size / 1024) + ' KB)'));
  });
} else {
  console.log('Directory does not exist:', targetDir);
}
