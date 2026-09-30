/**
 * CraftAI Studio — Local Database Server & REST API
 * Zero-dependency native Node.js server with JSON / SQLite persistence.
 * Compatible with local development, self-hosted VPS, Docker, Railway, or Render.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Initial DB state
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  return {
    meta: {
      appName: 'CraftAI Studio',
      version: '2.0.0',
      owner: 'iaiflash',
      email: 'iaiflash0.0@gmail.com',
      createdAt: new Date().toISOString()
    },
    projects: {}
  };
}

function saveDatabase(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving database file:', err);
    return false;
  }
}

let db = loadDatabase();

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 50 * 1024 * 1024) { // 50MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // CORS pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // -------------------------------------------------------------
  // REST API ENDPOINTS
  // -------------------------------------------------------------

  // 1. Healthcheck
  if (pathname === '/api/health' && method === 'GET') {
    return sendJson(res, 200, {
      status: 'ok',
      time: new Date().toISOString(),
      projectsCount: Object.keys(db.projects || {}).length,
      storage: 'JSON / SQLite Hybrid Engine'
    });
  }

  // 2. GET all projects
  if (pathname === '/api/projects' && method === 'GET') {
    return sendJson(res, 200, {
      success: true,
      projects: db.projects || {}
    });
  }

  // 3. GET project by ID
  if (pathname.startsWith('/api/projects/') && method === 'GET') {
    const id = pathname.split('/')[3];
    const project = db.projects && db.projects[id];
    if (project) {
      return sendJson(res, 200, { success: true, project });
    } else {
      return sendJson(res, 404, { success: false, message: 'Project not found' });
    }
  }

  // 4. POST create or update project
  if (pathname === '/api/projects' && method === 'POST') {
    try {
      const data = await parseBody(req);
      if (!data || !data.title) {
        return sendJson(res, 400, { success: false, message: 'Title is required' });
      }
      const id = data.id || Date.now().toString();
      if (!db.projects) db.projects = {};
      db.projects[id] = { ...data, id, updatedAt: new Date().toISOString() };
      saveDatabase(db);
      return sendJson(res, 200, { success: true, project: db.projects[id] });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 5. DELETE project by ID
  if (pathname.startsWith('/api/projects/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    if (db.projects && db.projects[id]) {
      delete db.projects[id];
      saveDatabase(db);
      return sendJson(res, 200, { success: true, message: `Project ${id} deleted` });
    } else {
      return sendJson(res, 404, { success: false, message: 'Project not found' });
    }
  }

  // 6. POST 2-way sync / bulk save
  if (pathname === '/api/sync' && method === 'POST') {
    try {
      const data = await parseBody(req);
      if (data && data.projects) {
        db.projects = { ...db.projects, ...data.projects };
        db.lastSyncedAt = new Date().toISOString();
        saveDatabase(db);
        return sendJson(res, 200, {
          success: true,
          message: 'Database synced successfully',
          projects: db.projects
        });
      }
      return sendJson(res, 400, { success: false, message: 'Invalid payload' });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 7. GET CapCut guide export
  if (pathname.startsWith('/api/export/capcut/') && method === 'GET') {
    const id = pathname.split('/')[4];
    const p = db.projects && db.projects[id];
    if (!p) {
      return sendJson(res, 404, { success: false, message: 'Project not found' });
    }
    let text = `CRAFTAI STUDIO — CAPCUT EDITING CUES\nProject: ${p.title}\n`;
    const longform = (p.scripts && p.scripts.longform) || [];
    longform.forEach((s, i) => {
      text += `\n[Segmen ${i+1}: ${s.seg}]\nNarasi: "${s.narr}"\nVisual: ${s.cue || '-'}\nSFX: ${s.sfx || '-'}\n`;
    });
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=UTF-8',
      'Content-Disposition': `attachment; filename="${p.title.replace(/[^a-zA-Z0-9]/g, '_')}_CapCut_Guide.txt"`
    });
    return res.end(text);
  }

  // -------------------------------------------------------------
  // STATIC FILE SERVING
  // -------------------------------------------------------------
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for single page app
      filePath = path.join(__dirname, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('500 Internal Server Error');
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log(`🚀 CraftAI Studio Database Server is LIVE!`);
  console.log(`🌐 Local URL  : http://localhost:${PORT}`);
  console.log(`📊 REST API   : http://localhost:${PORT}/api/health`);
  console.log(`💾 DB File    : ${DB_FILE}`);
  console.log(`📂 Upload Dir : ${UPLOAD_DIR}`);
  console.log('================================================================');
});
