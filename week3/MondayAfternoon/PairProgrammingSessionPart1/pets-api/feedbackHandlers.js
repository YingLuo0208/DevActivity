const Feedback = require("./feedbackLib");

// GET /feedbacks返回 HTTP 200 状态码，并把数据以 JSON 格式返回给客户端。
const getAllFeedbacks = (req, res) => {
  const feedbacks = Feedback.getAll();
  res.status(200).json(feedbacks);
};

// POST /feedbacks如果缺少任意字段，就返回 HTTP 400（客户端请求错误）
const createFeedback = (req, res) => {
  const { name, message, rating } = req.body;

  if (!name || !message || rating === undefined) {
    return res.status(400).json({ message: "Bad Request: Missing required fields" });
  }

  const newFeedback = Feedback.addOne(name, message, rating);

  if (newFeedback) {
    res.status(201).json(newFeedback);
  } else {
    res.status(500).json({ message: "Failed to create feedback" });
  }
};

// GET /feedbacks/:feedbackId
const getFeedbackById = (req, res) => {
  const feedbackId = req.params.feedbackId;
  const feedback = Feedback.findById(feedbackId);

  if (feedback) {
    res.status(200).json(feedback);
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

// PUT /feedbacks/:feedbackId如果请求体里没有任何可更新字段 → 返回 400 Bad Request。
const updateFeedback = (req, res) => {
  const feedbackId = req.params.feedbackId;
  const { name, message, rating } = req.body;

  if (!name && !message && rating === undefined) {
    return res.status(400).json({ message: "Bad Request: No fields to update" });
  }

  const updatedFeedback = Feedback.updateOneById(feedbackId, { name, message, rating });

  if (updatedFeedback) {
    res.status(200).json(updatedFeedback);
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

// DELETE /feedbacks/:feedbackId
const deleteFeedback = (req, res) => {
  const feedbackId = req.params.feedbackId;
  const isDeleted = Feedback.deleteOneById(feedbackId);

  if (isDeleted) {
    res.status(204).json({ message: "Feedback deleted successfully" });
  } else {
    res.status(404).json({ message: "Feedback not found" });
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
