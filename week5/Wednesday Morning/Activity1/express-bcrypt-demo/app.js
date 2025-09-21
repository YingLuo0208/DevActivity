const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // 解析 JSON 格式的请求体数据

// 定义用户数据模型（Schema）
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // 用户名（必填）
  password: { type: String, required: true }, // 密码（必填，存储加密后的）
});

// 创建 User 模型，对应 MongoDB 数据库中的 users 集合
const User = mongoose.model("User", userSchema);

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const bcrypt = require('bcrypt');

// 注册接口（创建新用户）
app.post("/api/users", async (req, res) => {
  const { username, password } = req.body; // 从请求体中获取用户名和密码

  try {
    // 生成一个随机盐（salt），10 表示加密强度
    const salt = await bcrypt.genSalt(10);
    // 使用盐对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建一个新用户，密码保存为加密后的值
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // 保存到数据库

    res.status(201).json({ message: "User registered successfully" }); // 返回注册成功
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // 服务器错误
  }
});

// 登录接口
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body; // 获取用户名和密码

  try {
    // 根据用户名查找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // 用户不存在
    }

    // 使用 bcrypt.compare 检查输入的密码是否和数据库中的哈希密码一致
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // 密码错误
    }

    res.status(200).json({ message: "Login successful" }); // 登录成功
  } catch (error) {
    res.status(500).json({ error: "Server error" }); // 服务器错误
  }
});
