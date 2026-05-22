function notFound(req, res, _next) {
  res.status(404).json({ message: `Not Found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, _req, res, _next) {
  const status = err.status || (err.name === "ValidationError" ? 400 : 500);
  console.error(err);
  res.status(status).json({ message: err.message || "Server error" });
}

module.exports = { notFound, errorHandler };
