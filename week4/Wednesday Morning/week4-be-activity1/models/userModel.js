const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 定义计数器 Schema，用来存储自增 ID
const counterSchema = new Schema({
  _id: { type: String, required: true }, // 集合名称，比如 "userId"
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

//定义 User Schema
const userSchema = new Schema(
  {
    _id: { type: Number }, // 自定义数字 ID
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true }
  },
  { timestamps: true }
);

// 在保存文档前生成自增 ID
userSchema.pre("save", async function(next) {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // 如果不存在就创建
    );
    doc._id = counter.seq;
  }
  next();
});

// 导出模型
module.exports = mongoose.model("User", userSchema);
