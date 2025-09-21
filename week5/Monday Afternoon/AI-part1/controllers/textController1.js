// 引入封装好的 gemini 模型服务
const model = require("../services/gemini");


// 处理 POST 请求到 /generate-text1 的控制器
// 预期接收的 JSON 请求体格式示例：
// {
//   "prompt": "Write 3 practical tips for staying productive while working from home."
// }

const generateText1 = async (req, res) => {
    // 从请求体中解构 prompt
    // 注意：这里为了测试，写死了一个 prompt，而不是用 req.body
    // const { prompt } = req.body || {};
    const { prompt } = {
        "prompt": "Suggest 5 creative marketing ideas for a small coffee shop."
    };

    // 如果没有 prompt，返回 400 错误
    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }

    try {
        // 调用大模型，传入 prompt，获取结果
        const result = await model(prompt);

        // 将模型返回的结果发送给前端
        res.json({ output: result.text });
    } catch (error) {
        // 如果出现错误，返回 500 和错误信息
        res.status(500).json({ error: error.message });
    }
}

// 导出控制器函数，供路由使用
module.exports = generateText1;
