// middleware/logger.js

// Custom middleware to log incoming requests
// 自定义中间件，用于记录每一个请求的信息
const logger = (req, res, next) => {
  const currentDate = new Date().toISOString();
  // 打印当前时间、请求方法和请求路径
  console.log(`[LOGGER] [${currentDate}] ${req.method} request to ${req.url}`);

  
  next(); // Pass control to the next middleware function
  // 调用 next()，将控制权传递给下一个中间件
};

module.exports = logger;
// 导出 logger 中间件，以便在其他文件中使用
