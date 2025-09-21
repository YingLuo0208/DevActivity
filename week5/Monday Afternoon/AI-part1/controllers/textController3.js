// 引入封装好的 gemini 模型服务
const model = require("../services/gemini");

// 函数：生成结构化健身计划
const generateFitnessPlan = async (fitnessType, frequency, experience, goal) => {
  // 构建 prompt，告诉大模型生成 JSON 格式的健身计划
  const prompt = `
  You are a professional fitness coach. Given the user's fitness experience, training frequency, and goal, generate a **structured fitness plan** in **JSON format**.
  
  ### **Schema Requirements**:
  {
    "fitness_plan": {
      "experience_level": "string",
      "goal": "string",
      "training_frequency": "number",
      "workout_split": [
        {
          "day": "string",
          "focus": "string",
          "exercises": [
            {
              "name": "string",
              "sets": "number",
              "reps": "string"
            }
          ]
        }
      ],
      "diet_recommendations": {
        "caloric_intake": "string",
        "macronutrient_breakdown": {
          "protein": "string",
          "carbs": "string",
          "fats": "string"
        },
        "meal_timing": "string",
        "example_meals": [
          {
            "meal": "string",
            "foods": ["string"]
          }
        ]
      },
      "recovery_tips": ["string"],
      "warnings": ["string"]
    }
  }
  
  ### **User Input**:
  I am a **${experience}** individual looking to focus on **${fitnessType}**.
  My goal is to **${goal}**, and I plan to train **${frequency}** times per week.
  
  Provide a structured fitness guideline including:
  - **Recommended exercises** with sets and reps.
  - **Workout split** (daily training focus).
  - **Dietary recommendations** (caloric intake, macronutrient breakdown, example meals).
  - **Recovery tips** and **warnings** to avoid injury.
  - **Return the response in the above JSON format**.
  `;

  try {
    // 调用大模型生成结果
    const result = await model(prompt);
    return result.text; // 返回模型文本结果
  } catch (error) {
    // 注意：这里 res 不能在这个函数里用，需要在上层控制器处理错误
    throw new Error(error.message);
  }
};

// POST 请求控制器：/generate-text3
// 前端请求示例（JSON 请求体）
// {
//   "fitnessType": "strength training",
//   "frequency": "4",
//   "experience": "beginner",
//   "goal": "build muscle and increase overall strength"
// }
const generateText3 = async (req, res) => {
  try {
    // 从请求体获取用户输入
    const { fitnessType, frequency, experience, goal } = req.body;

    // 校验必填字段
    if (!fitnessType || !frequency || !experience || !goal) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 调用生成健身计划函数
    const markdownResponse = await generateFitnessPlan(
      fitnessType,
      frequency,
      experience,
      goal
    );

    // 尝试从模型返回的文本中提取 JSON（假设模型返回 ```json ... ``` 包裹的内容）
    const jsonMatch = markdownResponse.match(/```json\s*([\s\S]*?)\s*```/);

    if (!jsonMatch) {
      return res
        .status(500)
        .json({ error: "Invalid response format. No JSON found." });
    }

    let fitnessPlan;
    try {
      // 解析 JSON
      fitnessPlan = JSON.parse(jsonMatch[1]);

      // 如果有多余的嵌套 plan key，就展开
      if (fitnessPlan.plan && fitnessPlan.plan.fitness_plan) {
        fitnessPlan = fitnessPlan.plan.fitness_plan;
      }

      // 标准化热量格式
      if (fitnessPlan.diet_recommendations?.caloric_intake) {
        const intakeRange =
          fitnessPlan.diet_recommendations.caloric_intake.match(/\d+/g);
        fitnessPlan.diet_recommendations.caloric_intake = {
          range: intakeRange ? intakeRange.join("-") : "Unknown",
          unit: "calories",
          notes: "Adjust based on individual needs and metabolism",
        };
      }

      // 确保 reps 使用数字最小-最大值
      fitnessPlan.workout_split?.forEach((day) => {
        day.exercises.forEach((exercise) => {
          if (
            typeof exercise.reps === "string" &&
            exercise.reps.includes("-")
          ) {
            const [min, max] = exercise.reps.split("-").map(Number);
            exercise.reps = { min, max };
          } else if (!isNaN(exercise.reps)) {
            exercise.reps = {
              min: Number(exercise.reps),
              max: Number(exercise.reps),
            };
          }
        });
      });

      // 优化 warnings 格式
      if (Array.isArray(fitnessPlan.warnings)) {
        fitnessPlan.warnings = fitnessPlan.warnings.map((warning) => ({
          category: warning.includes("injuries")
            ? "Injury Prevention"
            : "General",
          message: warning,
        }));
      }
    } catch (parseError) {
      return res.status(500).json({ error: "Error parsing JSON response." });
    }

    // 返回格式化后的健身计划
    res.json(fitnessPlan);
  } catch (err) {
    console.error("Error in generateResponse:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// 导出控制器函数
module.exports = generateText3;
