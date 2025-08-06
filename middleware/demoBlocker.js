// middleware/demoBlocker.js
function demoBlocker(req, res, next) {
  const isDemo = process.env.DEMO_MODE === 'true';
  const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (isDemo && writeMethods.includes(req.method)) {
    return res.status(403).json({ error: 'Write operations are disabled in demo mode.' });
  }

  next();
}

module.exports = demoBlocker;