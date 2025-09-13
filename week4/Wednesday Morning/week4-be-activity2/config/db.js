// db.js (simple improved)
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/web-dev';

  try {
    const conn = await mongoose.connect(uri, {
      // Mongoose 6+ 已默认开启 newUrlParser / unifiedTopology，但显式写也无妨
      useNewUrlParser: true,
      useUnifiedTopology: true,

      // 连接池与超时建议（可根据项目规模调整）
      minPoolSize: 2,
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000, // 尝试选择服务器的超时
      socketTimeoutMS: 45000,
      family: 4 // 优先 IPv4（如果需要）
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message || error);
    // 不在此处 process.exit，抛出错误由调用方决定如何处理
    throw error;
  }
};

module.exports = connectDB;
