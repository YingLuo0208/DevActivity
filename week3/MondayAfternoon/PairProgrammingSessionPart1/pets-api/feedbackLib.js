// feedbackLib.js

// 存放反馈数据的数组
let feedbacks = [];
// 自增 ID，从 1 开始
let currentId = 1;

// 获取所有反馈
const getAll = () => {
  return feedbacks;
}

/**
 * 添加一个新反馈
 * @param {string} name - 反馈人姓名
 * @param {string} message - 反馈内容
 * @param {number} rating - 评分
 * @returns {object|boolean} 新的反馈对象 或 false（如果参数不合法）
 */
const addOne = (name, message, rating) => {
  if (!name || !message || rating === undefined) {
    return false;
  }

  const newFeedback = {
    id: currentId++,
    name,
    message,
    rating
  };

  feedbacks.push(newFeedback);
  return newFeedback;
};

/**
 * 根据 ID 查找反馈
 * @param {number|string} id - 反馈的 id
 * @returns {object|boolean} 找到的反馈对象 或 false（如果没找到）
 */
const findById = (id) => {
  const numericId = Number(id);
  const feedback = feedbacks.find(item => item.id === numericId);
  return feedback || false;
};

/**
 * 根据 ID 更新反馈
 * @param {number|string} id - 反馈的 id
 * @param {object} updatedData - 要更新的字段（name, message, rating）
 * @returns {object|boolean} 更新后的反馈对象 或 false（如果没找到）
 */
const updateOneById = (id, updatedData) => {
  const feedback = findById(id);
  if (feedback) {
    if (updatedData.name) {
      feedback.name = updatedData.name;
    }
    if (updatedData.message) { 
      feedback.message = updatedData.message;
    }
    if (updatedData.rating !== undefined) {
      feedback.rating = updatedData.rating;
    }
    return feedback;
  }
  return false;
};

/**
 * 根据 ID 删除反馈
 * @param {number|string} id - 反馈的 id
 * @returns {boolean} 删除成功返回 true，没找到返回 false
 */
const deleteOneById = (id) => {
  const feedback = findById(id);
  if (feedback) {
    const initialLength = feedbacks.length;
    feedbacks = feedbacks.filter(item => item.id !== Number(id));
    return feedbacks.length < initialLength;
  }
  return false;
};



// 测试
if (require.main === module) {
  let result = addOne("John Smith", "Great session on React components! I found the examples very helpful.", 5);
  console.log(result);
  
  result = addOne("Luo", "I need more practice.", 4);
  console.log(result);

  console.log("Get all:", getAll());

  console.log("Find by ID (1):", findById(1));

  console.log("Update ID 1:", updateOneById(1, { rating: 4 }));
  console.log("Find by ID (1) again:", findById(1));

  console.log("Delete ID 1:", deleteOneById(1));
  console.log("Get all after delete:", getAll());
}

// 导出模块
module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById
};