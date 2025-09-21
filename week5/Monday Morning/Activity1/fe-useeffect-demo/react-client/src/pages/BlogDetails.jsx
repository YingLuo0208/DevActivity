// 导入 React Router 的 useNavigate 用于路由跳转，useParams 用于获取 URL 参数
import { useNavigate, useParams } from "react-router-dom";
// 导入 React 的 useState 和 useEffect Hook
import { useEffect, useState } from "react";

// 导入 API 地址配置
import { REACT_APP_API_URL } from "../utils/apiConfig";
// 拼接完整博客 API 地址
const apiUrl = `${REACT_APP_API_URL}/api/blogs`;

const BlogDetails = () => {
  // 获取路由参数中的博客 id
  const { id } = useParams();
  console.log(id); // 打印博客 id，调试用

  // 定义博客数据状态，初始为 null
  const [blog, setBlog] = useState(null);

  // 定义路由跳转函数
  const navigate = useNavigate();

  // useEffect 在组件挂载或 id 变化时执行
  useEffect(() => {
    // 异步函数获取指定博客的数据
    const fetchBlog = async () => {
      const response = await fetch(`${apiUrl}/${id}`); // 调用 API
      console.log(`${apiUrl}/${id}`); // 打印请求 URL，调试用
      const json = await response.json(); // 解析返回的 JSON 数据

      if (response.ok) {
        setBlog(json); // 请求成功时更新博客状态
      }
    };

    fetchBlog(); // 执行异步请求
  }, [id]); // 依赖 id，当 id 变化时重新获取博客

  // 删除博客函数
  const handleClick = async () => {
    // 调用 DELETE API 删除博客
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    navigate("/"); // 删除成功后跳转回首页
  };

  // const handleClick = () => {
  //   fetch(`${apiUrl}/${id}`, {
  //     method: "DELETE",
  //   }).then(() => {
  //     navigate("/");
  //   });
  // };

  // const handleClick = async () => {
  //   try {
  //     await fetch(`${apiUrl}/${id}`, {
  //       method: "DELETE",
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error deleting blog:", error);
  //   }
  // };

  // 返回的 JSX 渲染博客详情
  return (
    <div className="blog-details">
      {blog && ( // 当 blog 有数据时才渲染
        <article>
          <h2>{blog.title}</h2> {/* 博客标题 */}
          <p>Written by {blog.author}</p> {/* 博客作者 */}
          <div>{blog.body}</div> {/* 博客内容 */}
          <button onClick={handleClick}>delete</button> {/* 删除按钮 */}
        </article>
      )}
    </div>
  );
};

// 导出 BlogDetails 组件
export default BlogDetails;
