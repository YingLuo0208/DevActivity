const express = require("express");
const app = express();

const {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require("./feedbackHandlers");

// Middleware to parse JSON
app.use(express.json());

// ROUTES

// GET /feedback - 获取所有反馈
app.get("/feedback", getAllFeedbacks);

// POST /feedback - 创建新反馈
app.post("/feedback", createFeedback);

// GET /feedback/:feedbackId - 根据 ID 获取反馈
app.get("/feedback/:feedbackId", getFeedbackById);

// PUT /feedback/:feedbackId - 更新反馈
app.put("/feedback/:feedbackId", updateFeedback);

// DELETE /feedback/:feedbackId - 删除反馈
app.delete("/feedback/:feedbackId", deleteFeedback);

// 启动服务器
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
