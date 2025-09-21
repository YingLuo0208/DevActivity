// 引入自定义的 gemini 模型调用函数
const model = require("./gemini");

// 定义一个异步函数，用来生成个性化健康计划
const generateHealthPlan = async (age, gender, healthGoal, dietPreference, workoutDays) => {
  // 构造提示词（prompt），告诉大模型需要什么格式、什么内容
  const prompt = `
You are a certified health and fitness consultant. Based on the user's details, create a **personalized health improvement plan** in **JSON format**.

### Schema Requirements:
{
  "health_plan": {
    "age": "number",                       // 用户年龄
    "gender": "string",                    // 用户性别
    "goal": "string",                      // 健康目标，例如减脂/增肌
    "diet_preference": "string",           // 饮食偏好，例如素食、高蛋白
    "workout_days_per_week": "number",     // 每周锻炼天数
    "weekly_workout_schedule": [           // 一周锻炼安排
      {
        "day": "string",                   // 星期几
        "focus": "string",                 // 当天训练重点，例如“力量”“心肺”
        "activities": [                    // 当天具体训练动作
          {
            "name": "string",              // 动作名称
            "duration_minutes": "number",  // 持续时间（分钟）
            "intensity": "string"          // 强度，例如“低、中、高”
          }
        ]
      }
    ],
    "nutrition_guidelines": {              // 营养指南
      "daily_calories": "string",          // 每日推荐热量
      "macronutrient_breakdown": {         // 宏量营养素分配
        "protein": "string",
        "carbs": "string",
        "fats": "string"
      },
      "meal_examples": [                   // 示例餐单
        {
          "meal": "string",                // 餐次，例如“早餐”
          "foods": ["string"]              // 推荐食物
        }
      ]
    },
    "lifestyle_recommendations": ["string"],  // 生活方式建议
    "progress_tracking_tips": ["string"]      // 进度追踪建议
  }
}

### User Input:
I am a ${age}-year-old ${gender} aiming to ${healthGoal}.
My diet preference is ${dietPreference}, and I can work out ${workoutDays} days per week.

Please:
- Provide a **weekly workout schedule** tailored to my goal.
- Suggest **nutrition guidelines** aligned with my diet preference.
- Include **lifestyle recommendations** to support my goal.
- Add **progress tracking tips**.
- Return the response in the exact JSON format above.
`;

  try {
    // 调用大模型生成结果
    const result = await model(prompt);
    // 返回生成的文本（JSON 格式字符串）
    return result.text;
  } catch (error) {
    // 如果调用失败，抛出错误信息
    throw new Error(error.message);
  }
};

// 导出函数，供其他文件调用
module.exports = generateHealthPlan;
