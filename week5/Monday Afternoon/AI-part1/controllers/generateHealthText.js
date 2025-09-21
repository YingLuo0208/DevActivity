// 引入自定义的健康计划生成服务
const generateHealthPlan = require("../services/healthPlan");

// POST 请求控制器：/generate-health-text
const generateHealthText = async (req, res) => {
  try {
    // 从请求体中获取用户输入
    const { age, gender, healthGoal, dietPreference, workoutDays } = req.body;

    // 校验必填字段，如果有缺失则返回 400 错误
    if (!age || !gender || !healthGoal || !dietPreference || !workoutDays) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 调用 generateHealthPlan 生成健康计划（Markdown 格式）
    const markdownResponse = await generateHealthPlan(
      age,
      gender,
      healthGoal,
      dietPreference,
      workoutDays
    );

    // 尝试从 Markdown 文本中提取 JSON 内容
    const jsonMatch = markdownResponse.match(/```json\s*([\s\S]*?)\s*```/);

    // 如果没有找到 JSON，返回 500 错误
    if (!jsonMatch) {
      return res.status(500).json({ error: "Invalid response format. No JSON found." });
    }

    let healthPlan;
    try {
      // 解析 JSON
      healthPlan = JSON.parse(jsonMatch[1]);

      // 如果包含每日热量信息，标准化格式
      if (healthPlan.health_plan?.nutrition_guidelines?.daily_calories) {
        const intakeRange = healthPlan.health_plan.nutrition_guidelines.daily_calories.match(/\d+/g);
        healthPlan.health_plan.nutrition_guidelines.daily_calories = {
          range: intakeRange ? intakeRange.join("-") : "Unknown", // 范围
          unit: "calories", // 单位
          notes: "Adjust based on individual needs and metabolism" // 备注
        };
      }
    } catch (parseError) {
      // 如果解析 JSON 出错，返回 500
      return res.status(500).json({ error: "Error parsing JSON response." });
    }

    // 返回最终 JSON 健康计划给前端
    res.json(healthPlan);
  } catch (err) {
    // 捕获其他错误，返回 500
    console.error("Error in generateHealthText:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// 导出控制器函数
module.exports = generateHealthText;
