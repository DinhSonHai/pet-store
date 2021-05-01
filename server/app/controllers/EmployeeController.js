const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const _ = require('lodash');
const generateToken = require('../../helpers/generateToken');
const {
  jwtSignInSecretAdmin,
  SECRET_ADMIN_SIGNUP,
} = require('../../config/default.json');
const hashString = require('../../helpers/hashString');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').user;
const crudService = require('../../services/crud');
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
        return res.status(statusCode.notFound).json({
          errors: [{ msg: message.notFound }],
        });
      }
      return res.status(statusCode.success).json(user);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   POST api/employee/signin
  // @desc    Đăng nhập tài khoản admin/employee
  // @access  Public
  async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await crudService.getUnique(Employee, { email });
      if (!user) {
        return res.status(statusCode.badRequest).json({
          errors: [{ msg: message.loginFail }],
        });
      }
      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        return res.status(statusCode.badRequest).json({
          errors: [{ msg: message.loginFail }],
        });
      }
      const { id, role } = user;
      if (role === 1 || role === 0) {
        const payload = {
          user: {
            id,
            role,
          },
        };
        const token = generateToken(payload, jwtSignInSecretAdmin, '30d');
        return res.status(statusCode.success).json({ token });
      }
      return res.status(statusCode.unauthorized).json({
        errors: [{ msg: message.invalidRole }],
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   POST api/employee/signup
  // @desc    Đăng ký tài khoản nhân viên
  // @access  Private
  async signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Lấy thông tin user theo email
      let user = await Employee.findOne({ email });
      if (user) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.userExist }] });
      }

      const hashedPassword = await hashString(password);
      const status = await crudService.create(Employee, {
        ...req.body,
        password: hashedPassword,
      });
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.registerSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.registerFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   POST api/employee/signup_admin
  // @desc    Đăng ký tài khoản admin(cần khóa bí mật)
  // @access  Private
  async signUp_admin(req, res) {
    const { name, email, password, secret } = req.body;
    if (!secret || secret !== SECRET_ADMIN_SIGNUP) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.error }] });
    }
    try {
      //Lấy thông tin user theo email
      let user = await crudService.getUnique(Employee, { email });
      if (user) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.userExist }] });
      }
      //Mã hóa mật khẩu

      const hashedPassword = await hashString(password);
      user = new Employee({
        password: hashedPassword,
        name,
        email,
      });
      user.key = user._id;
      user.role = 0;
      await user.save((err, data) => {
        if (!err) {
          return res
            .status(statusCode.success)
            .json({ message: message.registerSuccess });
        }
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.registerFail }] });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }
}

module.exports = new EmployeeController();
