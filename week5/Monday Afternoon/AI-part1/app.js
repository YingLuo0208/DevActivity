
// 后端入口文件 app.js

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// 导入控制器
const generateText1  = require("./controllers/textController1");
const generateText2  = require("./controllers/textController2");
const generateText3  = require("./controllers/textController3");
const generateHealthText = require("./controllers/generateHealthText");

// 中间件
app.use(express.json());

// 测试接口
app.get("/", (req, res) => {
  res.send("API is running");
});

// API 路由（统一小写 + 短横线风格）
app.post('/api/generate-text1', generateText1);
app.post('/api/generate-text2', generateText2);
app.post('/api/generate-text3', generateText3);
app.post('/api/generate-health-text', generateHealthText);

// 启动服务器
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
