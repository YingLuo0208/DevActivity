const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义计数器 Schema，用来存储自增 ID
const counterSchema = new Schema({
  _id: { type: String, required: true }, // 集合名称，比如 "blogId"
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

// 定义 Blog Schema
const blogSchema = new Schema({
  _id: { type: Number }, // 自定义数字 ID
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// 在保存文档前，生成自增 ID
blogSchema.pre('save', async function(next) {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'blogId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // 如果不存在就创建
    );
    doc._id = counter.seq;
  }
  next();
});

//导出模型
module.exports = mongoose.model('Blog', blogSchema);
