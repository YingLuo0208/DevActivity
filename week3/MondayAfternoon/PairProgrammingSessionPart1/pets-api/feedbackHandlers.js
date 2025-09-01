const Feedback = require("./feedbackLib");

const getAllFeedbacks = (req, res) => {
    res.json(Feedback.getALL());
};

const createFeedback = (req, res) => {
    const { name, message, rating} = req.bady;
    const newFeedback = Feedback.addOne( name, message, rating);
    res.json(newFeedback);
};

const getFeedbackById = (req, res) => {
    res.json();
};

const updateFeedback = (req, res) => {
    res.json();
};

const deleteFeedback = (req, res) => {
    res.json();
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};