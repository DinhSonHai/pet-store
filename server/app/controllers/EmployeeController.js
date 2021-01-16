process.env['NODE_CONFIG_DIR'] = __dirname;
const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const config = require('config');
class EmployeeController {
  // @route   GET api/employee/user
  // @desc    Lấy dữ liệu nhân viên/admin
  // @access  Private
  async getUserData(req, res) {
    try {
      const user = await Employee.findById(req.user.id).select([
        '-password',
        '-resetPasswordLink',
      ]);
      if (!user) {
        return res.status(404).json({
          errors: [{ msg: 'Tài khoản không tồn tại' }],
        });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/employee/signin
  // @desc    Đăng nhập tài khoản admin/employee
  // @access  Public
  async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Lấy thông tin user theo email
      let user = await Employee.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ!' }],
        });
      }
      //Kiểm tra mật khẩu
      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ!' }],
        });
      }
      const { id, role } = user;
      if (role === 1 || role === 0) {
        //Tạo payload cho token
        const payload = {
          user: {
            id,
            role,
          },
        };
        //Trả về token
        jwt.sign(
          payload,
          config.get('jwtSignInSecretAdmin'),
          { expiresIn: '30d' },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
        return;
      }
      return res.status(401).json({
        errors: [{ msg: 'Từ chối thao tác, bạn không có quyền truy cập!' }],
      });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   POST api/employee/signup
  // @desc    Đăng ký tài khoản nhân viên
  // @access  Private
  async signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      gender,
      dateOfBirth,
    } = req.body;
    try {
      //Lấy thông tin user theo email
      let user = await Employee.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Nhân viên này đã tồn tại!' }] });
      }
      //Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const userFields = {
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        address,
        gender,
        dateOfBirth,
      };
      user = new Employee({
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        address,
        gender,
        dateOfBirth,
      });
      user.key = user._id;

      // Lưu tài khoản vào csdl
      user.save((err, data) => {
        if (!err) {
          return res.json({ message: 'Đăng ký thành công!' });
        }
        return res.status(400).json({ errors: [{ msg: 'Đăng ký thất bại!' }] });
      });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   POST api/employee/signup_admin
  // @desc    Đăng ký tài khoản admin(cần khóa bí mật)
  // @access  Private
  async signUp_admin(req, res) {
    const { name, email, password, secret } = req.body;
    if (!secret || secret !== config.get('SECRET_ADMIN_SIGNUP')) {
      return res.status(400).json({ errors: [{ msg: 'Truy cập bị chặn!!' }] });
    }
    try {
      //Lấy thông tin user theo email
      let user = await Employee.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin này đã tồn tại!' }] });
      }
      //Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);
      user = new Employee({
        password: hashedPassword,
        name,
        email,
      });
      user.key = user._id;
      user.role = 0;
      //Lưu tài khoản vào csdl
      await user.save((err, data) => {
        if (!err) {
          return res.json({ message: 'Đăng ký thành công!' });
        }
        return res.status(400).json({ errors: [{ msg: 'Đăng ký thất bại!' }] });
      });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new EmployeeController();
