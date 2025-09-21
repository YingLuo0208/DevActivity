// 引入封装好的 gemini 模型服务
const model = require("../services/gemini");

// 处理 POST 请求到 /generate-text2 的控制器
// 前端请求示例（JSON 请求体）：
// {
//   "fitnessType": "strength training",
//   "frequency": "4",
//   "experience": "beginner",
//   "goal": "build muscle and increase overall strength"
// }

const generateText2 = async (req, res) => {

  // 原始设计：从请求体中解构健身类型、频率、经验、目标
  // const { fitnessType, frequency, experience, goal } = req.body;

  // 当前版本：改为获取更详细的健康参数
  const { age, gender, healthGoal, dietPreference, workoutDays } = req.body;

  // 校验：如果有字段缺失，返回 400 错误
  if (!age || !gender || !healthGoal || !dietPreference || !workoutDays) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // 旧版本的 prompt（基于 fitnessType/experience/goal/frequency）
  /*
  const prompt = `
    I am a ${experience} individual looking to focus on ${fitnessType}.
    My goal is to ${goal}, and I plan to train ${frequency} times per week.
    Provide a structured fitness guideline including recommended exercises, duration, and any diet suggestions.
  `;
  */

  // 新版本的 prompt（基于年龄、性别、目标、饮食、训练天数）
  const prompt = `
  I am a ${age}-year-old ${gender} aiming to ${healthGoal}.
  My diet preference is ${dietPreference}, and I can work out ${workoutDays} days per week.
  Please provide a personalized weekly health and fitness plan, including exercise types, duration, and meal suggestions.
`;

  try {
    // 调用大模型，传入 prompt
    const result = await model(prompt);

    // 返回模型生成的结果
    res.json({ output: result.text });
  } catch (error) {
    // 如果出现错误，返回 500 并输出错误信息
    res.status(500).json({ error: error.message });
  }
};

// 导出控制器函数，供路由使用
module.exports = generateText2;
