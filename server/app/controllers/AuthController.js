const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env['NODE_CONFIG_DIR'] = __dirname;
const config = require('config');
const nodemailer = require('nodemailer');
const dayjs = require('dayjs');

const User = require('../models/User');
const Employee = require('../models/Employee');
const Admin = require('../models/Admin');

class AuthController {
  // @route   GET api/auth/signup
  // @desc    Sign up an account
  // @access  Public
  async signUp(req, res) {
    //Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      gender,
      dateOfBirth,
      phoneNumber,
    } = req.body;

    try {
      // Kiểm tra xem người dùng đã tồn tại chưa
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Địa chỉ email này đã được đăng ký' }] });
      }

      const payload = {
        user: {
          name,
          email,
          password,
          gender,
          dateOfBirth,
          phoneNumber,
        },
      };

      //Generate token
      const token = jwt.sign(payload, config.get('jwtSignUpSecret'), {
        expiresIn: '7d',
      });

      //Gửi link kích hoạt tài khoản đến email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.get('NODEMAILER_EMAIL'),
          pass: config.get('NODEMAILER_PASSWORD'),
        },
      });

      const content = `
        <h1>Hãy nhấn vào đường dẫn này để kích hoạt tài khoản của bạn</h1>
        <p>${config.get('CLIENT_URL')}/auth/activate/${token}</p>
        <hr/>
        <p>Hãy cẩn thận, email này chứa thông tin về tài khoản của bạn</p>
        <p>${config.get('CLIENT_URL')}</p>
      `;

      //step 2
      const mailOptions = {
        from: config.get('NODEMAILER_EMAIL'),
        to: email,
        subject: 'Thông báo kích hoạt tài khoản',
        html: content,
      };

      //step 3
      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.json({
            message: `Một mail đã được gửi đến email ${email}, hãy truy cập hộp thư của bạn để kích hoạt tài khoản`,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: err,
          });
        });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   POST api/auth/activate
  // @desc    Activate an account
  // @access  Public
  async activate(req, res) {
    const { token } = req.body;
    try {
      //Xác thực token có hợp lệ không
      const decoded = jwt.verify(token, config.get('jwtSignUpSecret'));
      const {
        name,
        email,
        password,
        gender,
        dateOfBirth,
        phoneNumber,
      } = decoded.user;
      //Kiểm tra xem tài khoản đã được kích hoạt chưa
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Tài khoản đã được kích hoạt' }] });
      }

      user = new User({
        name,
        email,
        password,
        gender,
        dateOfBirth,
        phoneNumber,
      });
      //Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //Định dạng lại ngày
      user.dateOfBirth = dayjs(user.dateOfBirth).format();
      //Lưu tài khoản vào csdl
      await user.save();
      return res.json({ message: 'Kích hoạt tài khoản thành công' });
    } catch (error) {
      return res.status(401).json({ errors: [{ msg: 'Token không hợp lệ' }] });
    }
  }

  // @route   GET api/auth/signin
  // @desc    Sign in
  // @access  Public
  async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //Lấy thông tin user theo email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ' }],
        });
      }
      // if (!user) {
      //   //Kiểm tra xem có phải nhân viên đăng nhập không
      //   user = await Employee.findOne({ email });
      //   if (!user) {
      //     //Kiểm tra xem có phải nhân viên đăng nhập không
      //     user = await Admin.findOne({ email });
      //   }
      //   if (!user) {
      //     return res.status(400).json({
      //       errors: [{ msg: 'Tên tài khoản hoặc mật khẩu không hợp lệ' }],
      //     });
      //   }
      // }
      //Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ' }],
        });
      }
      //Tạo payload cho token
      const payload = {
        user: {
          id: user._id,
        },
      };
      //Trả về token
      jwt.sign(
        payload,
        config.get('jwtSignInSecret'),
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new AuthController();
