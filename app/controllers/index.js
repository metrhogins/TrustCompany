const express = require('express');
const router = express.Router();
const path = require('path');

// --- APIs ---

// Simple test route
router.get("/task/hello", (req, res) => {
  return res.status(403).send('1231231');
});

// Nested routes for /task and /api
// NOTE: must be registered BEFORE the frontend static/wildcard handlers
// so the wildcard router.get('*') does not swallow API requests
router.use('/task', require('./users'));
router.use('/api', require('./chat'));

// --- Frontend Static Routes (Vite or React) ---

// Serve static files
router.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Serve index.html on root
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

// SPA fallback — guard against swallowing unmatched API routes
router.get('*', function (req, res) {
  if (req.path.startsWith('/api/') || req.path.startsWith('/task/')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

module.exports = router;