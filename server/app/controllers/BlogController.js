const Blog = require("../models/Blog");
const crudService = require("../../services/crud");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").crud;
const pagination = require("../../helpers/pagination");

class BlogController {
  // @route   GET api/blogs
  // @desc    Lấy tất cả blogs
  // @access  Public
  async getAll(req, res, next) {
    const { start, end } = pagination(req.query.page, 6);
    try {
      const blogs = await crudService.getAdvance(
        Blog,
        {},
        { createdAt: "desc" },
        {
          path: "employeeId",
          select: ["name"],
        }
      );
      return res.status(statusCode.success).json({
        data: blogs.slice(start, end),
        total: blogs.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/blogs/:id
  // @desc    Lấy blog theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const blog = await Blog.findById(req.params.id).populate({
        path: "employeeId",
        select: ["name"],
      });
      if (!blog) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      return res.json(blog);
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/blogs/tags
  // @desc    Lấy blog theo tags
  // @access  Public
  async getByTags(req, res, next) {
    const { start, end } = pagination(req.query.page, 10);
    try {
      const blogs = await Blog.find({ tags: { $in: [req.query.tags] } }).sort({
        createdAt: "desc",
      });
      return res.json({ data: blogs.slice(start, end), total: blogs.length });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/blogs/newest
  // @desc    Lấy blog moi nhat
  // @access  Public
  async getByNewest(req, res, next) {
    try {
      const blogs = await Blog.find({}).sort({ createdAt: "desc" }).limit(10);
      return res.json(blogs);
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/blogs
  // @desc    Tạo blog
  // @access  Private
  async create(req, res, next) {
    try {
      req.body.employeeId = req.user.id;
      const status = await crudService.create(Blog, req.body);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.createSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.createFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/blogs/:id
  // @desc    Sửa blog
  // @access  Private
  async update(req, res, next) {
    try {
      const blog = await crudService.getById(Blog, req.params.id);
      if (!blog) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(blog, req.body);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.updateSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.updateFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route  DELETE api/blogs/:id
  // @desc    Xoa blog
  // @access  Private
  async remove(req, res, next) {
    try {
      const blog = await crudService.getById(Blog, req.params.id);
      if (!blog) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      await blog.remove({ _id: blog._id }, (err) => {
        if (err) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.removeFail }] });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.removeSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/blogs/search
  // @desc    Tìm kiếm blog theo từ khóa
  // @access  Public
  async search(req, res) {
    const q = req.query.q;
    const search = new RegExp(q, "i");
    const query = { title: search };
    const { start, end } = pagination(req.query.page, 12);
    try {
      const blogs = await crudService.getAll(Blog, query);
      return res.status(statusCode.success).json({
        data: blogs.slice(start, end),
        total: blogs.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new BlogController();
