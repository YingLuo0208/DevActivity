const express = require("express");
const app = express();
const carRouter = require("./routes/carRouter");
const { middleware1, middleware2 } = require("./middleware/customMiddlewares");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");

// Middleware to parse JSON
// 中间件：解析请求体中的 JSON 数据
app.use(express.json());

// 使用自定义 logger 中间件记录请求信息
app.use(logger);

// 根路由 "/"，使用 middleware1 作为中间件
app.get("/", middleware1, (req, res) => res.send("API Running!"));
// 当访问 "/" 时，会先执行 middleware1，然后发送 "API Running!" 响应

// Use the carRouter for all /cars routes
// 所有 "/cars" 路径的请求，使用 carRouter 路由处理
app.use("/cars", carRouter);

// 使用自定义 middleware2 中间件
app.use(middleware2);

// 使用自定义 notFound 中间件处理未匹配到的路由
app.use(notFound);

const port = 4000;
// Start the server
// 启动服务器，监听指定端口
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // 控制台打印服务器已启动信息
});
