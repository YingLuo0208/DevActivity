const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET /blogs
// 获取所有博客
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); // 按创建时间倒序排列
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs" });
  }
};

// POST /blogs
// 创建新博客
const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create({ ...req.body });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: "Failed to create blog", error: error.message });
  }
};

// GET /blogs/:blogId
// 根据 ID 获取单个博客
const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blog" });
  }
};

// PUT /blogs/:blogId
// 更新博客
const updateBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
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
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// DELETE /blogs/:blogId
// 删除博客
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
    if (deletedBlog) {
      res.status(200).json({ message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
