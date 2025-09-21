// app.js
/*
// API 的 URL 地址，指向 JSONPlaceholder 的 posts 接口
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// 新博客数据对象
const blog = {
  title: 'New Blog',                       // 博客标题
  body: 'This is the content of the new blog.', // 博客内容
  userId: 1,                               // 用户 ID
};

// 新增博客的异步函数
const addBlog = async () => {
  const response = await fetch(apiUrl, {   // 向 API 发送请求
    method: 'POST',                         // 请求方法：POST（新增）
    body: JSON.stringify(blog),             // 请求体：将 blog 对象转成 JSON 字符串
    headers: {
      'Content-Type': 'application/json',   // 请求头，告诉服务器请求体是 JSON
    },
  });

  const json = await response.json();       // 解析响应为 JSON
  console.log('New Blog added:', json);     // 打印新增博客结果
};

// Example Usage
addBlog();


// API 的 URL 地址，指向 JSONPlaceholder 的 posts 接口
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// 异步函数：获取所有博客
const fetchBlogs = async () => {
  const response = await fetch(apiUrl);    // 发送 GET 请求到 API
  const data = await response.json();       // 将响应解析为 JSON 数据
  console.log('All Blogs:', data);          // 打印所有博客到控制台
};

// 示例调用：执行获取博客函数
fetchBlogs();


// API 的 URL 地址，指向 JSONPlaceholder 的 posts 接口
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// 要获取的博客 ID
const blogId = 1; // 可替换为想要测试的博客 ID

// 异步函数：根据 ID 获取单个博客
const fetchBlog = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`); // 向 API 发送 GET 请求，URL 加上博客 ID
  const data = await response.json();              // 将响应解析为 JSON 数据
  console.log('Single Blog:', data);              // 打印单个博客数据到控制台
};

// 示例调用：执行获取单个博客函数
fetchBlog(blogId);



// API 的 URL 地址，指向 JSONPlaceholder 的 posts 接口
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// 要更新的博客 ID
const blogIdToUpdate = 1; // 可替换为想要测试的博客 ID

// 更新后的博客数据对象
const updatedData = { 
  title: 'Updated Blog',             // 新标题
  body: 'This blog has been updated.' // 新内容
};

// 异步函数：更新指定 ID 的博客
const updateBlog = async (blogId, updatedData) => {
  const response = await fetch(`${apiUrl}/${blogId}`, { // PUT 请求，URL 加上博客 ID
    method: 'PUT',                                     // 请求方法：PUT（更新）
    headers: {
      'Content-Type': 'application/json',             // 请求头，告诉服务器请求体是 JSON
    },
    body: JSON.stringify(updatedData),                // 请求体，包含更新后的数据
  });

  const updatedBlog = await response.json();         // 将响应解析为 JSON 数据
  console.log('Blog updated:', updatedBlog);         // 打印更新后的博客数据到控制台
};

// 示例调用：执行更新博客函数
updateBlog(blogIdToUpdate, updatedData);

*/

// app.js

// API 的 URL 地址，指向 JSONPlaceholder 的 posts 接口
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// 要删除的博客 ID
const blogIdToDelete = 1; // 可替换为想要测试的博客 ID

// 异步函数：删除指定 ID 的博客
const deleteBlog = async (blogId) => {
  await fetch(`${apiUrl}/${blogId}`, { // 向 API 发送 DELETE 请求
    method: 'DELETE',                  // 请求方法：DELETE（删除）
  });

  console.log('Blog deleted successfully'); // 打印删除成功信息
};

// 示例调用：执行删除博客函数
deleteBlog(blogIdToDelete);