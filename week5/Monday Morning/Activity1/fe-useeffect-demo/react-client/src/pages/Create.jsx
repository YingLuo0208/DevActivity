// 导入 React 的 useState Hook 用于组件状态管理
import { useState } from "react";
// 导入 useNavigate 用于路由跳转
import { useNavigate } from "react-router-dom";
// 导入 API 地址配置
import { REACT_APP_API_URL } from "../utils/apiConfig";

// 拼接完整的博客 API 地址
const apiUrl = `${REACT_APP_API_URL}/api/blogs`;

const Create = () => {
  // 定义博客标题、内容、作者的状态
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");

  // 用于页面跳转
  const navigate = useNavigate();

  // 表单提交处理函数
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止默认表单刷新行为

    // 创建博客对象
    const blog = { title, body, author };

    // 调用 API POST 请求创建博客
    const response = await fetch(apiUrl, {
      method: "POST", // 请求方法为 POST
      body: JSON.stringify(blog), // 请求体转为 JSON 字符串
      headers: {
        "Content-Type": "application/json", // 指定请求类型为 JSON
      },
    });

    const json = await response.json(); // 获取返回的 JSON 数据

    if (!response.ok) {
      // 请求失败时输出错误
      console.log("Error");
    }
    if (response.ok) {
      // 请求成功时重置表单
      setTitle("");
      setBody("");
      setAuthor("");
      console.log("new blog added:", json);
      navigate("/"); // 跳转回首页
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      {/* 表单 */}
      <form onSubmit={handleSubmit}>
        {/* 博客标题输入 */}
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title} // 输入框值绑定状态
          onChange={(e) => setTitle(e.target.value)} // 输入变化更新状态
        />

        {/* 博客内容输入 */}
        <label>Blog body:</label>
        <textarea
          required
          value={body} // 文本区域值绑定状态
          onChange={(e) => setBody(e.target.value)} // 输入变化更新状态
        ></textarea>

        {/* 博客作者选择 */}
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>

        {/* 提交按钮 */}
        <button>Add Blog</button>
      </form>
    </div>
  );
};

// 导出 Create 组件
export default Create;
