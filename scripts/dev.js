const http = require("http");
const fs = require("fs");
const path = require("path");
 
const root = path.join(__dirname, "..");
const port = Number(process.env.PORT) || 3000;
 
// load .env if present
const envFile = path.join(root, ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
 
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".ico": "image/x-icon", ".mp4": "video/mp4", ".woff2": "font/woff2"
};
 
http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
 
  // /api/* → run the Vercel function
  if (url.pathname.startsWith("/api/")) {
    const name = url.pathname.slice(5).replace(/[^a-z0-9_-]/gi, "");
    const file = path.join(root, "api", name + ".js");
    if (!name || name.startsWith("_") || !fs.existsSync(file)) { res.writeHead(404); return res.end("not found"); }
    let body = "";
    for await (const chunk of req) body += chunk;
    try { req.body = body ? JSON.parse(body) : {}; } catch { req.body = body; }
    res.status = code => { res.statusCode = code; return res; };
    res.json = obj => { res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(obj)); };
    try {
      delete require.cache[require.resolve(file)];
      delete require.cache[require.resolve(path.join(root, "catalog.json"))];
      await require(file)(req, res);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) { res.statusCode = 500; res.end("server error"); }
    }
    return;
  }
 
  // static files
  let p = decodeURIComponent(url.pathname);
  if (p.endsWith("/")) p += "index.html";
  let file = path.join(root, p);
  if (!path.extname(p) && fs.existsSync(file + ".html")) file += ".html"; // /quiz → quiz.html (like Vercel cleanUrls)
  const blocked = /^(\/api|\/scripts|\/\.)/.test(p) || /\.env$/.test(p);
  if (!file.startsWith(root) || blocked || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("404 — مش موجود");
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`\n✓ الموقع شغال على: http://localhost:${port}`);
  console.log(`  الإيميل والشيت: ${process.env.ORDERS_WEBHOOK_URL ? "متوصّل" : "مش متوصّل"}`);
  console.log(`  واتساب: ${process.env.CALLMEBOT_APIKEY ? "متوصّل" : "مش متوصّل"}`);
  console.log(`  إشعارات ntfy: ${process.env.NTFY_TOPIC ? "متوصّل" : "مش متوصّل"}`);
  console.log("  لإيقافه اضغطي Ctrl + C\n");
});
 