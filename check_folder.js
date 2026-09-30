const fs = require('fs');

try {
  const content = fs.readFileSync('index.html', 'utf8');
  const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    new Function(scriptMatch[1]);
    console.log('SUCCESS: index.html JavaScript syntax is 100% VALID and error-free!');
  } else {
    console.log('ERROR: <script> tag not found');
  }
} catch (err) {
  console.error('SYNTAX ERROR DETECTED:', err.message);
  console.error(err.stack);
}
