const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
process.env['NODE_CONFIG_DIR'] = __dirname;
const config = require('config');
const nodemailer = require('nodemailer');
const dayjs = require('dayjs');
const axios = require('axios');

const User = require('../models/User');
// const Employee = require('../models/Employee');
// const Admin = require('../models/Admin');

class AuthController {
  // @route   GET api/auth/user
  // @desc    Get user data
  // @access  Private
  async getUserData(req, res) {
    try {
      const user = await User.findById(req.user.id).select([
        '-password',
        '-resetPasswordLink',
      ]);
      if (!user) {
        return res.status(404).json({
          errors: [{ msg: 'Người dùng không tồn tại' }],
        });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/auth/signup
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
        expiresIn: '1d',
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
          .json({ errors: [{ msg: 'Tài khoản đã được kích hoạt!' }] });
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
      return res.json({ message: 'Kích hoạt tài khoản thành công!' });
    } catch (error) {
      return res.status(401).json({
        errors: [
          {
            msg:
              'Link kích hoạt tài khoản đã hết hạn, vui lòng thực hiện lại thao tác.',
          },
        ],
      });
    }
  }

  // @route   POST api/auth/signin
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
          errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ!' }],
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
      const isMatch = await user.checkPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ!' }],
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

  // @route   PUT api/auth/forgetpassword
  // @desc    Send request for reset pwd
  // @access  Public
  async forgotPassword(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      //Kiểm tra tài khoản có tồn tại hay không
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Không tìm thấy tài khoản khớp với email của bạn' }],
        });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(payload, config.get('jwtResetPasswordSecret'), {
        expiresIn: '1d',
      });

      await user.updateOne({
        resetPasswordLink: token,
      });

      //Gửi link đặt lại mật khẩu đến email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.get('NODEMAILER_EMAIL'),
          pass: config.get('NODEMAILER_PASSWORD'),
        },
      });

      const content = `
        <h1>Hãy nhấn vào đường dẫn này để đặt lại mật khẩu cho tài khoản của bạn</h1>
        <p>${config.get('CLIENT_URL')}/auth/resetpassword/${token}</p>
        <hr/>
        <p>Hãy cẩn thận, email này chứa thông tin về tài khoản của bạn</p>
        <p>${config.get('CLIENT_URL')}</p>
      `;

      //step 2
      const mailOptions = {
        from: config.get('NODEMAILER_EMAIL'),
        to: email,
        subject: 'Thông báo đặt lại mật khẩu cho tài khoản',
        html: content,
      };

      //step 3
      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.json({
            message: `Một mail đã được gửi đến email ${email}, hãy truy cập hộp thư của bạn để đặt lại mật khẩu cho tài khoản`,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            errors: [{ msg: err.message }],
          });
        });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PUT api/auth/resetpassword
  // @desc    Reset password
  // @access  Public
  async resetPassword(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, resetPasswordLink } = req.body;
    try {
      let user_id;
      jwt.verify(
        resetPasswordLink,
        config.get('jwtResetPasswordSecret'),
        (err, decoded) => {
          user_id = decoded.user.id;
          if (err) {
            return res.status(400).json({
              errors: [
                {
                  msg:
                    'Link reset hết hạn, vui lòng quay lại trang quên mật khẩu và thực hiện lại thao tác.',
                },
              ],
            });
          }
        }
      );
      //Kiểm tra tài khoản được thay đổi mật khẩu
      let user = await User.findById(user_id);
      //Kiểm tra có tài khoản nào cần được đặt lại mật khẩu không
      if (!user.resetPasswordLink) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Link reset đã được sử dụng, vui lòng quay lại trang quên mật khẩu và thực hiện lại thao tác.',
            },
          ],
        });
      }
      if (user.resetPasswordLink !== resetPasswordLink) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Token không hợp lệ!, vui lòng quay lại trang quên mật khẩu và thực hiện lại thao tác.',
            },
          ],
        });
      }
      const salt = await bcrypt.genSalt(10);

      const hashPassword = await bcrypt.hash(password, salt);
      const updatedFields = {
        password: hashPassword,
        resetPasswordLink: '',
      };

      user = _.extend(user, updatedFields);

      user.save((err, result) => {
        if (err) {
          return res.status(400).json({
            errors: [{ msg: 'Xảy ra lỗi khi reset password, hãy thử lại!' }],
          });
        }
        return res.json({
          message: `Reset password thành công!, bạn có thể đăng nhập với mật khẩu mới.`,
        });
      });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }
  // @route   PUT api/auth/update_user
  // @desc    Update user info
  // @access  Private
  async updateUserInfo(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      password,
      phone,
      password_old,
      avatar,
      gender,
      dateOfBirth,
    } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại!' }] });
      }

      if (name && name !== user.name) {
        user.name = name;
      }
      if (phone && phone !== user.phoneNumber) {
        user.phoneNumber = phone;
      }
      if (gender && gender !== user.gender) {
        user.gender = gender;
      }
      if (password_old) {
        const isMatch = await user.checkPassword(password_old);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Mật khẩu cũ không chính xác!' }] });
        }
      }
      if (password && password !== user.password) {
        if (password.length < 6 || password.length > 32) {
          return res.status(400).json({
            errors: [
              {
                msg:
                  'Độ dài của mật khẩu phải nằm trong khoảng từ 6 đến 32 ký tự',
              },
            ],
          });
        }
        if (!/\d/.test(password)) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Mật khẩu phải bao gồm số' }] });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
      if (avatar && avatar !== user.avatar) {
        user.avatar = avatar;
      }
      if (
        dateOfBirth &&
        dateOfBirth.toString() !== user.dateOfBirth.toString()
      ) {
        user.dateOfBirth = dateOfBirth;
      }
      user.save((err, updateUser) => {
        if (err) {
          return res.status(400).json({
            errors: [{ msg: 'Lỗi, không thể cập nhật dữ liệu người dùng!' }],
          });
        }
        updateUser.password = undefined;
        return res.json(updateUser);
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/auth/add_address
  // @desc    Add user address
  // @access  Private
  async AddUserAddress(req, res, next) {
    function getData(path) {
      return new Promise((resolve, reject) => {
        axios
          .get(path)
          .then(function (response) {
            resolve(response.data.results);
          })
          .catch(function (err) {
            reject(err.error);
          });
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      provinceState,
      wardState,
      townState,
      moreInfo,
      isDefault,
    } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại!' }] });
      }
      Promise.all([
        getData(`https://vapi.vnappmob.com/api/province`),
        getData(
          `https://vapi.vnappmob.com/api/province/district/${provinceState}`
        ),
        getData(`https://vapi.vnappmob.com/api/province/ward/${wardState}`),
      ])
        .then((results) => {
          let province_name = results[0].find(
            (item) => parseInt(item.province_id) === provinceState
          ).province_name;
          let ward_name = results[1].find(
            (item) => parseInt(item.district_id) === wardState
          ).district_name;
          let town_name = results[2].find(
            (item) => parseInt(item.ward_id) === townState
          ).ward_name;
          let address =
            moreInfo.trim() +
            ', ' +
            town_name +
            ', ' +
            ward_name +
            ', ' +
            province_name;
          if (isDefault) {
            const mapedAddress = user.address.map((item) => {
              const { value, p_id, w_id, t_id, m } = item;
              return {
                value,
                isDefault: false,
                p_id,
                w_id,
                t_id,
                m,
              };
            });
            user.address = [
              ...mapedAddress,
              {
                value: address,
                isDefault: true,
                p_id: provinceState,
                w_id: wardState,
                t_id: townState,
                m: moreInfo,
              },
            ];
          } else {
            user.address = [
              ...user.address,
              {
                value: address,
                isDefault: user.address.length === 0 ? true : false,
                p_id: provinceState,
                w_id: wardState,
                t_id: townState,
                m: moreInfo,
              },
            ];
          }
          user.save((err, updateUser) => {
            if (err) {
              return res.status(400).json({
                errors: [
                  { msg: 'Lỗi, không thể cập nhật dữ liệu người dùng!' },
                ],
              });
            }
            updateUser.password = undefined;
            return res.json(updateUser);
          });
        })
        .catch((err) =>
          res.status(400).json({
            errors: [
              { msg: 'Có lỗi xảy ra, hãy reload lại trang và thử lại!' },
            ],
          })
        );
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/auth/remove_address
  // @desc    Remove user address
  // @access  Private
  async RemoveUserAddress(req, res, next) {
    const { address_id } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại!' }] });
      }
      let findedAdress = user.address.find(
        (item) => item._id.toString() === address_id
      );
      if (!findedAdress) {
        return res.status(400).json({
          errors: [{ msg: 'Địa chỉ không tồn tại!' }],
        });
      }
      let removedAddress = user.address.filter(
        (item) => item._id.toString() !== address_id
      );
      user.address = removedAddress;
      await user.save((err, updateUser) => {
        if (err) {
          return res.status(400).json({
            errors: [{ msg: 'Lỗi, không thể cập nhật dữ liệu người dùng!' }],
          });
        }
        updateUser.password = undefined;
        return res.json(updateUser);
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/auth/update_address
  // @desc    Update user address
  // @access  Private
  async UpdateUserAddress(req, res, next) {
    function getData(path) {
      return new Promise((resolve, reject) => {
        axios
          .get(path)
          .then(function (response) {
            resolve(response.data.results);
          })
          .catch(function (err) {
            reject(err.error);
          });
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      provinceState,
      wardState,
      townState,
      moreInfo,
      isDefault,
      address_id,
    } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại!' }] });
      }
      let index;
      let findedAdress = user.address.find((item, i) => {
        index = i;
        return item._id.toString() === address_id;
      });
      if (!findedAdress) {
        return res.status(400).json({
          errors: [{ msg: 'Địa chỉ không tồn tại!' }],
        });
      }

      Promise.all([
        getData(`https://vapi.vnappmob.com/api/province`),
        getData(
          `https://vapi.vnappmob.com/api/province/district/${provinceState}`
        ),
        getData(`https://vapi.vnappmob.com/api/province/ward/${wardState}`),
      ])
        .then((results) => {
          let province_name = results[0].find(
            (item) => parseInt(item.province_id) === provinceState
          ).province_name;
          let ward_name = results[1].find(
            (item) => parseInt(item.district_id) === wardState
          ).district_name;
          let town_name = results[2].find(
            (item) => parseInt(item.ward_id) === townState
          ).ward_name;
          let address =
            moreInfo.trim() +
            ', ' +
            town_name +
            ', ' +
            ward_name +
            ', ' +
            province_name;
          let upadateAddress;
          if (findedAdress.isDefault) {
            upadateAddress = {
              _id: findedAdress._id,
              value: address,
              isDefault: true,
              p_id: provinceState,
              w_id: wardState,
              t_id: townState,
              m: moreInfo,
            };
          } else {
            if (isDefault) {
              let defaultIndex = user.address.findIndex(
                (item) => item.isDefault
              );
              user.address[defaultIndex].isDefault = false;
            }
            upadateAddress = {
              _id: findedAdress._id,
              value: address,
              isDefault,
              p_id: provinceState,
              w_id: wardState,
              t_id: townState,
              m: moreInfo,
            };
          }
          user.address[index] = upadateAddress;
          user.save((err, updateUser) => {
            if (err) {
              return res.status(400).json({
                errors: [
                  { msg: 'Lỗi, không thể cập nhật dữ liệu người dùng!' },
                ],
              });
            }
            updateUser.password = undefined;
            return res.json(updateUser);
          });
        })
        .catch((err) =>
          res.status(400).json({
            errors: [
              { msg: 'Có lỗi xảy ra, hãy reload lại trang và thử lại!' },
            ],
          })
        );
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new AuthController();
