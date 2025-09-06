// middleware/notFound.js

// Middleware to handle not found resources
const notFound = (req, res, next) => {
  console.log(`[NOTFOUND] No route matched ${req.url}`);
  res.status(404).send("Resource not found");
};

module.exports = notFound;
