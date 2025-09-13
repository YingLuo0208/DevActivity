const Blog = require("../models/blogModel");

// GET /blogs
// 获取所有博客
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 }); // 按创建时间倒序排列
  res.status(200).json(blogs);
};

// POST /blogs
// 创建新博客
const createBlog = async (req, res) => {
  const newBlog = await Blog.create({ ...req.body });
  res.status(201).json(newBlog);
};

// GET /blogs/:blogId
// 根据 ID 获取单个博客
const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// PUT /blogs/:blogId
// 更新博客
const updateBlog = async (req, res) => {
  const { blogId } = req.params;

  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: blogId },
    { ...req.body },
    { new: true } // 返回更新后的文档
  );
  if (updatedBlog) {
    res.status(200).json(updatedBlog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// DELETE /blogs/:blogId
// 删除博客
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
  if (deletedBlog) {
    res.status(200).json({ message: "Blog deleted successfully" });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
