const { validationResult } = require("express-validator");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const shortid = require("shortid");
const nodemailer = require("nodemailer");
const axios = require("axios");
const {
  jwtSignUpSecret,
  jwtSignInSecret,
  jwtResetPasswordSecret,
  GOOGLE_CLIENT,
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  CLIENT_URL,
} = require("../../config/default.json");
const client = new OAuth2Client(GOOGLE_CLIENT);
const hashString = require("../../helpers/hashString");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").user;
const crudService = require("../../services/crud");
const pagination = require("../../helpers/pagination");
const generateToken = require("../../helpers/generateToken");

const User = require("../models/User");
const Product = require("../models/Product");

function getData(path) {
  return new Promise((resolve, reject) => {
    axios.default
      .get(path)
      .then(function (response) {
        resolve(response.data.results);
      })
      .catch(function (err) {
        reject(err.error);
      });
  });
}
class AuthController {
  // @route   GET api/auth/user
  // @desc    Lấy thông tin người dùng
  // @access  Private
  async getUserData(req, res) {
    try {
      const user = await User.findById(req.user.id).select([
        "-password",
        "-resetPasswordLink",
      ]);
      if (!user) {
        return res.status(statusCode.notFound).json({
          errors: [{ msg: message.notFound }],
        });
      }
      return res.json(user);
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/auth/signup
  // @desc    Đăng ký tài khoản
  // @access  Public
  async signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }

    const { name, email, password, gender, dateOfBirth, phoneNumber } =
      req.body;

    try {
      let user = await crudService.getUnique(User, { email });
      if (user) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.emailExist }] });
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
      const token = generateToken(payload, jwtSignUpSecret, "1d");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_PASSWORD,
        },
      });
      const content = `
        <h1>Hãy nhấn vào đường dẫn này để kích hoạt tài khoản của bạn</h1>
        <p>${CLIENT_URL}/auth/activate/${token}</p>
        <hr/>
        <p>Hãy cẩn thận, email này chứa thông tin về tài khoản của bạn</p>
        <p>${CLIENT_URL}</p>
      `;
      const mailOptions = {
        from: NODEMAILER_EMAIL,
        to: email,
        subject: "Thông báo kích hoạt tài khoản",
        html: content,
      };
      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.status(statusCode.success).json({
            message: `Một mail đã được gửi đến email ${email}, hãy truy cập hộp thư của bạn để kích hoạt tài khoản`,
          });
        })
        .catch((err) => {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: err.message }],
          });
        });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server error");
    }
  }

  // @route   POST api/auth/activate
  // @desc    Kích hoạt tài khoản
  // @access  Public
  async activate(req, res) {
    const { token } = req.body;
    try {
      const decoded = jwt.verify(token, jwtSignUpSecret);
      const { name, email, password, gender, dateOfBirth, phoneNumber } =
        decoded.user;
      let user = await crudService.getUnique(User, { email });
      if (user) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.alreadyActive }] });
      }

      user = new User({
        name,
        email,
        password,
        gender,
        dateOfBirth,
        phoneNumber,
      });
      const hashedPassword = await hashString(password);
      user.password = hashedPassword;
      user.dateOfBirth = new Date(user.dateOfBirth).toISOString();
      await user.save((err, data) => {
        if (!err) {
          return res
            .status(statusCode.success)
            .json({ message: message.activeSuccess });
        }
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.activeFail }] });
      });
    } catch (error) {
      return res.status(statusCode.badRequest).json({
        errors: [
          {
            msg: message.activeExpired,
          },
        ],
      });
    }
  }

  // @route   POST api/auth/signin
  // @desc    Đăng nhập
  // @access  Public
  async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await crudService.getUnique(User, { email });
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
      const payload = {
        user: {
          id: user._id,
          role: user.role,
        },
      };
      const token = generateToken(payload, jwtSignInSecret, "7d");
      return res.status(statusCode.success).json({ token });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server error");
    }
  }

  // @route   POST api/auth/facebooklogin
  // @desc    Đăng nhập bằng facebok
  // @access  Public
  async facebookLogin(req, res) {
    const { userID, accessToken } = req.body;
    const URL = `https://graph.facebook.com/v11.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
    if (!userID || !accessToken) {
      return;
    }
    try {
      const facebookRes = await axios.default.get(URL);
      const {
        email,
        name,
        picture: { data },
      } = facebookRes.data;
      const user = await crudService.getUnique(User, { email });
      if (user) {
        const payload = {
          user: {
            id: user._id,
            role: user.role,
          },
        };
        const token = generateToken(payload, jwtSignInSecret, "7d");
        return res.status(statusCode.success).json({ token });
      }
      const hashedPassword = await hashString(shortid.generate());
      const newUser = new User({
        name,
        email,
        avatar: data.url,
        password: hashedPassword,
      });
      await newUser.save((err, userData) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.error }],
          });
        }
        const payload = {
          user: {
            id: userData._id,
            role: userData.role,
          },
        };
        const token = generateToken(payload, jwtSignInSecret, "7d");
        return res.status(statusCode.success).json({ token });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server error");
    }
  }
  // @route   POST api/auth/googlelogin
  // @desc    Đăng nhập bằng google
  // @access  Public
  async googleLogin(req, res) {
    const { idToken } = req.body;
    if (!idToken) {
      return;
    }
    try {
      client
        .verifyIdToken({ idToken, audience: GOOGLE_CLIENT })
        .then(async (response) => {
          const { email_verified, name, email, picture } = response.payload;

          if (email_verified) {
            const user = await crudService.getUnique(User, { email });
            if (user) {
              const payload = {
                user: {
                  id: user._id,
                  role: user.role,
                },
              };
              const token = generateToken(payload, jwtSignInSecret, "7d");
              return res.status(statusCode.success).json({ token });
            }
            const hashedPassword = await hashString(shortid.generate());
            const newUser = new User({
              name,
              email,
              avatar: picture,
              password: hashedPassword,
            });
            await newUser.save((err, userData) => {
              if (err) {
                return res.status(statusCode.badRequest).json({
                  errors: [{ msg: message.error }],
                });
              }
              const payload = {
                user: {
                  id: userData._id,
                  role: userData.role,
                },
              };
              const token = generateToken(payload, jwtSignInSecret, "7d");
              return res.status(statusCode.success).json({ token });
            });
          } else {
            return res.status(statusCode.badRequest).json({
              errors: [
                {
                  msg: message.invalidGoogleAccount,
                },
              ],
            });
          }
        });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server error");
    }
  }

  // @route   PUT api/auth/forgetpassword
  // @desc    Yêu cầu reset password
  // @access  Public
  async forgotPassword(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let user = await crudService.getUnique(User, { email });

      if (!user) {
        return res.status(statusCode.badRequest).json({
          errors: [{ msg: message.notFound }],
        });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      const token = generateToken(payload, jwtResetPasswordSecret, "15m");
      await user.updateOne({
        resetPasswordLink: token,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_PASSWORD,
        },
      });

      const content = `
        <h1>Hãy nhấn vào đường dẫn này để đặt lại mật khẩu cho tài khoản của bạn</h1>
        <p>${CLIENT_URL}/auth/resetpassword/${token}</p>
        <hr/>
        <p>Hãy cẩn thận, email này chứa thông tin về tài khoản của bạn</p>
        <p>${CLIENT_URL}</p>
      `;

      const mailOptions = {
        from: NODEMAILER_EMAIL,
        to: email,
        subject: "Thông báo đặt lại mật khẩu cho tài khoản",
        html: content,
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.status(statusCode.success).json({
            message: `Một mail đã được gửi đến email ${email}, hãy truy cập hộp thư của bạn để đặt lại mật khẩu cho tài khoản`,
          });
        })
        .catch((err) => {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: err.message }],
          });
        });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server error");
    }
  }

  // @route   PUT api/auth/resetpassword
  // @desc    Reset password
  // @access  Public
  async resetPassword(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { password, resetPasswordLink } = req.body;
    try {
      let user_id;
      jwt.verify(resetPasswordLink, jwtResetPasswordSecret, (err, decoded) => {
        user_id = decoded.user.id;
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [
              {
                msg: message.resetExpired,
              },
            ],
          });
        }
      });
      let user = await crudService.getById(User, user_id);
      if (!user.resetPasswordLink) {
        return res.status(statusCode.badRequest).json({
          errors: [
            {
              msg: message.resetUsed,
            },
          ],
        });
      }
      if (user.resetPasswordLink !== resetPasswordLink) {
        return res.status(statusCode.badRequest).json({
          errors: [
            {
              msg: message.resetUsed,
            },
          ],
        });
      }
      const hashPassword = await hashString(password);
      const updatedFields = {
        password: hashPassword,
        resetPasswordLink: "",
      };

      user = _.extend(user, updatedFields);

      user.save((err, result) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.resetPasswordFail }],
          });
        }
        return res.status(statusCode.success).json({
          message: message.resetPasswordSuccess,
        });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server error");
    }
  }
  // @route   PUT api/auth/update_user
  // @desc    Cập nhật thông tin người dùng
  // @access  Private
  async updateUserInfo(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { name, password, phone, password_old, avatar, gender, dateOfBirth } =
      req.body;
    try {
      let user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
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
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.wrongPass }] });
        }
      }
      if (password && password !== user.password) {
        if (password.length < 6 || password.length > 32) {
          return res.status(statusCode.badRequest).json({
            errors: [
              {
                msg: "Độ dài của mật khẩu phải nằm trong khoảng từ 6 đến 32 ký tự",
              },
            ],
          });
        }
        if (!/\d/.test(password)) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: "Mật khẩu phải bao gồm số" }] });
        }
        const hashedPassword = await hashString(password);
        user.password = hashedPassword;
      }
      if (avatar && avatar !== user.avatar) {
        user.avatar = avatar;
      }
      if (
        dateOfBirth &&
        dateOfBirth.toString() !== user.dateOfBirth.toString()
      ) {
        user.dateOfBirth = new Date(dateOfBirth).toISOString();
      }
      user.save((err, updateUser) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.updateFail }],
          });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.updateSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/auth/add_address
  // @desc    Thêm địa chỉ người dùng
  // @access  Private
  async addUserAddress(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { provinceState, wardState, townState, moreInfo, isDefault } =
      req.body;
    try {
      let user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
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
            (item) => item.province_id === provinceState
          ).province_name;
          let ward_name = results[1].find(
            (item) => item.district_id === wardState
          ).district_name;
          let town_name = results[2].find(
            (item) => item.ward_id === townState
          ).ward_name;
          let address =
            moreInfo.trim() +
            ", " +
            town_name +
            ", " +
            ward_name +
            ", " +
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
              return res.status(statusCode.badRequest).json({
                errors: [{ msg: message.updateFail }],
              });
            }
            return res
              .status(statusCode.success)
              .json({ message: message.updateSuccess });
          });
        })
        .catch((err) =>
          res.status(statusCode.badRequest).json({
            errors: [{ msg: message.error }],
          })
        );
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/auth/remove_address
  // @desc    Xóa địa chỉ người dùng
  // @access  Private
  async removeUserAddress(req, res, next) {
    const { address_id } = req.body;
    try {
      let user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      let findedAdress = user.address.find(
        (item) => item._id.toString() === address_id
      );
      if (!findedAdress) {
        return res.status(statusCode.notFound).json({
          errors: [{ msg: "Địa chỉ không tồn tại!" }],
        });
      }
      let removedAddress = user.address.filter(
        (item) => item._id.toString() !== address_id
      );
      user.address = removedAddress;
      await user.save((err, updateUser) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.updateFail }],
          });
        }
        return res.json({ message: message.updateSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/auth/update_address
  // @desc    Cập nhật địa chỉ người dùng
  // @access  Private
  async updateUserAddress(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
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
      let user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      let index;
      let findedAdress = user.address.find((item, i) => {
        index = i;
        return item._id.toString() === address_id;
      });
      if (!findedAdress) {
        return res.status(statusCode.notFound).json({
          errors: [{ msg: "Địa chỉ không tồn tại!" }],
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
            (item) => item.province_id === provinceState
          ).province_name;
          let ward_name = results[1].find(
            (item) => item.district_id === wardState
          ).district_name;
          let town_name = results[2].find(
            (item) => item.ward_id === townState
          ).ward_name;
          let address =
            moreInfo.trim() +
            ", " +
            town_name +
            ", " +
            ward_name +
            ", " +
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
          user.save((err, _) => {
            if (err) {
              return res.status(statusCode.badRequest).json({
                errors: [{ msg: message.updateFail }],
              });
            }
            return res
              .status(statusCode.success)
              .json({ message: message.updateSuccess });
          });
        })
        .catch((err) =>
          res.status(statusCode.badRequest).json({
            errors: [{ msg: message.error }],
          })
        );
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
  // @route   PUT api/auth/favorite
  // @desc    Thêm/Bỏ sản phẩm ưa thích
  // @access  Private
  async favoriteProduct(req, res) {
    const { productId } = req.body;
    try {
      const [product, user] = await Promise.all([
        crudService.getById(Product, productId),
        crudService.getById(User, req.user.id),
      ]);
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: "Sản phẩm không tồn tại!" }] });
      }
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const isHave = user.favoriteProducts.some(
        (item) => item.toString() === productId.toString()
      );
      if (isHave) {
        const index = user.favoriteProducts.indexOf(productId);
        user.favoriteProducts.splice(index, 1);
      } else {
        user.favoriteProducts = [productId, ...user.favoriteProducts];
      }
      user.save((err, _) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.updateFail }],
          });
        }
        return res.status(statusCode.success).json({ check: isHave });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
  // @route   GET api/auth/favorite
  // @desc    Lấy sản phẩm ưa thích
  // @access  Private
  async getFavoriteProducts(req, res) {
    try {
      const user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      let length = user.favoriteProducts.length;
      let getFavoriteProducts = [];
      if (length > 0) {
        for (let i = 0; i < length; ++i) {
          let product = await crudService.getById(
            Product,
            user.favoriteProducts[i]
          );
          if (product) {
            getFavoriteProducts = [
              ...getFavoriteProducts,
              {
                _id: product._id,
                productName: product.productName,
                price: product.price,
                discountPrice: product.discountPrice,
                image: product.images[0],
                starRatings: product.starRatings,
              },
            ];
          }
        }
        const { start, end } = pagination(req.query.page, 5);
        return res.status(statusCode.success).json({
          data: getFavoriteProducts.slice(start, end),
          total: getFavoriteProducts.length,
        });
      }
      return res.status(statusCode.success).json({ data: [], total: 0 });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
  // @route   GET api/auth/purchased
  // @desc    Lấy sản phẩm đã mua
  // @access  Private
  async getPurchasedProducts(req, res) {
    try {
      const user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      let length = user.purchasedProducts.length;
      let getPurchasedProducts = [];
      if (length > 0) {
        for (let i = 0; i < length; ++i) {
          let product = await crudService.getById(
            Product,
            user.purchasedProducts[i]
          );
          if (product) {
            getPurchasedProducts = [
              ...getPurchasedProducts,
              {
                _id: product._id,
                productName: product.productName,
                price: product.price,
                discountPrice: product.discountPrice,
                image: product.images[0],
                starRatings: product.starRatings,
              },
            ];
          }
        }
        const { start, end } = pagination(req.query.page, 5);
        return res.status(statusCode.success).json({
          data: getPurchasedProducts.slice(start, end),
          total: getPurchasedProducts.length,
        });
      }
      return res.status(statusCode.success).json({ data: [], total: 0 });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new AuthController();
