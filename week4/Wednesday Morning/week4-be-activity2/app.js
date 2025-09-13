require("dotenv").config(); // 记得加载环境变量
const connectDB = require("./config/db");
const express = require("express");
const carRouter = require("./routes/carRouter");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(requestLogger);

// base route
app.get("/", (req, res) => res.send("API Running!"));

// routes
app.use("/api/cars", carRouter);
// app.use("/api/users", userRouter);
// app.use("/api/blogs", blogRouter);

// error handling
app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;

// ✅ 先连数据库，再开服务器
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1); // 启动失败直接退出
  });
