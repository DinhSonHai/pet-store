const { validationResult } = require('express-validator');
process.env['NODE_CONFIG_DIR'] = __dirname;
const config = require('config');
const nodemailer = require('nodemailer');
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;

const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const User = require('../models/User');

class OrderController {
  // @route   GET api/order
  // @desc    Lấy tất cả đơn hàng phía admin
  // @access  Private
  async getAllOrderAdmin(req, res) {
    try {
      let orders = await Order.find({}).sort({ createdAt: 'desc' });
      if (!orders) {
        return res.status(404).json({ msg: 'Chưa có đơn hàng nào.' });
      }
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/order
  // @desc    Đặt hàng vai trò khách
  // @access  Public
  async guestOrder(req, res) {
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
      email,
      name,
      phone,
      totalMoney,
      deliveryState,
      paymentState,
      note,
      cart,
    } = req.body;
    try {
      Promise.all([
        getData(`https://vapi.vnappmob.com/api/province`),
        getData(
          `https://vapi.vnappmob.com/api/province/district/${provinceState}`
        ),
        getData(`https://vapi.vnappmob.com/api/province/ward/${wardState}`),
      ])
        .then(async (results) => {
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
          const cartLength = cart.length;
          if (!cart || cartLength <= 0) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Đơn hàng không hợp lệ!' }] });
          }
          let order = new Order({
            name,
            phone,
            email,
            address,
            note,
            totalMoney,
            deliveryState,
            paymentState,
          });
          order.key = order._id;
          order.amount = cartLength;
          let getProducts = [];
          if (order._id) {
            for (let i = 0; i < cartLength; ++i) {
              const product = await Product.findById(cart[i]._id);
              if (!product) {
                return res.status(404).json({
                  errors: [{ msg: 'Sản phẩm không tồn tại!' }],
                });
              }
              getProducts.push({ product, amount: cart[i].amount });
              let detail = new OrderDetail({
                orderId: order._id,
                productId: product._id,
                productName: product.productName,
                amount: cart[i].amount,
                price: product.price,
              });
              detail.key = detail._id;
              await detail.save();
            }
            await order.save();
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Đơn hàng không hợp lệ!' }] });
          }
          if (email) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: config.get('NODEMAILER_EMAIL'),
                pass: config.get('NODEMAILER_PASSWORD'),
              },
            });

            const item = getProducts.map(
              (cartItem, index) =>
                `<li>Sản phẩm ${index + 1}<ul><li>Tên sản phẩm: ${
                  cartItem.product.productName
                }</li><li>Số lượng: ${
                  cartItem.amount
                }</li><li>Đơn giá mỗi sản phẩm: ${cartItem.product.price.toLocaleString(
                  'vi-VN',
                  { style: 'currency', currency: 'VND' }
                )}</li></ul></li>`
            );

            const content = `
          <h1>Bạn vừa mua hàng ở Pet store</h1>
          <p>Tên khách hàng: ${name}</p>
          <p>Điện thoại: ${phone}</p>
          <p>Địa chỉ: ${address}</p>
          <p>Tổng giá trị đơn hàng: ${totalMoney.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}</p>
          <p>Đơn hàng của quý khách:</p>
          <ul>
            ${item}
          </ul>
          <hr/>
          <p>Xin cảm ơn quý khách</p>
          <p>${config.get('CLIENT_URL')}</p>
        `;

            const mailOptions = {
              from: config.get('NODEMAILER_EMAIL'),
              to: email,
              subject: 'Thông báo mua hàng ở Pet store',
              html: content,
            };

            transporter
              .sendMail(mailOptions)
              .then(() => {
                return res.json({
                  message:
                    'Đặt hàng thành công, vui lòng kiểm tra đơn hàng của bạn trong hộp thư',
                });
              })
              .catch((err) => {
                return res.status(400).json({
                  errors: [{ msg: err.message }],
                });
              });
          }
        })
        .catch((err) =>
          res.status(400).json({
            errors: [
              { msg: 'Có lỗi xảy ra, hãy reload lại trang và thử lại!' },
            ],
          })
        );
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }
  // @route   POST api/order/auth
  // @desc    Đặt hàng vai trò người dùng
  // @access  Private
  async authOrder(req, res) {
    const {
      totalMoney,
      deliveryState,
      paymentState,
      note,
      cart,
      address,
    } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại!' }] });
      }
      const cartLength = cart.length;
      if (!cart || cartLength <= 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Đơn hàng không hợp lệ!' }] });
      }
      if (!user.phoneNumber) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Vui lòng cung cấp số điện thoại!' }] });
      }
      let order = new Order({
        userId: user._id,
        name: user.name,
        phone: user.phoneNumber,
        email: user.email,
        address,
        totalMoney,
        note,
        deliveryState,
        paymentState,
      });
      order.key = order._id;
      order.amount = cartLength;
      let getProducts = [];
      if (order._id) {
        for (let i = 0; i < cartLength; ++i) {
          const product = await Product.findById(cart[i]._id);
          if (!product) {
            return res.status(404).json({
              errors: [{ msg: 'Sản phẩm không tồn tại!' }],
            });
          }
          getProducts.push({ product, amount: cart[i].amount });
          let detail = new OrderDetail({
            orderId: order._id,
            productId: product._id,
            productName: product.productName,
            amount: cart[i].amount,
            price: product.price,
          });
          detail.key = detail._id;
          await detail.save();
        }
        await order.save();
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Đơn hàng không hợp lệ!' }] });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.get('NODEMAILER_EMAIL'),
          pass: config.get('NODEMAILER_PASSWORD'),
        },
      });

      const item = getProducts.map(
        (cartItem, index) =>
          `<li>Sản phẩm ${index + 1}<ul><li>Tên sản phẩm: ${
            cartItem.product.productName
          }</li><li>Số lượng: ${
            cartItem.amount
          }</li><li>Đơn giá mỗi sản phẩm: ${cartItem.product.price.toLocaleString(
            'vi-VN',
            { style: 'currency', currency: 'VND' }
          )}</li></ul></li>`
      );

      const content = `
          <h1>Bạn vừa mua hàng ở Pet store</h1>
          <p>Tên khách hàng: ${user.name}</p>
          <p>Điện thoại: ${user.phoneNumber}</p>
          <p>Địa chỉ: ${address}</p>
          <p>Tổng giá trị đơn hàng: ${totalMoney.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}</p>
          <p>Đơn hàng của quý khách:</p>
          <ul>
            ${item}
          </ul>
          <hr/>
          <p>Xin cảm ơn quý khách</p>
          <p>${config.get('CLIENT_URL')}</p>
        `;

      const mailOptions = {
        from: config.get('NODEMAILER_EMAIL'),
        to: user.email,
        subject: 'Thông báo mua hàng ở Pet store',
        html: content,
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.json({
            message:
              'Đặt hàng thành công, vui lòng kiểm tra đơn hàng của bạn trong hộp thư',
          });
        })
        .catch((err) => {
          return res.status(400).json({
            errors: [{ msg: err.message }],
          });
        });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/order/auth
  // @desc    Hủy đơn hàng
  // @access  Private
  async cancleOrder(req, res) {
    try {
      let orderId = req.params.orderId;
      let order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ msg: 'Không tìm thấy đơn đặt hàng này.' });
      }
      let { status } = order;
      // -1: Hủy đơn hàng
      // 0: Đặt hàng thành công
      // 1: Đã xác nhận đơn hàng
      // 2: Đang lấy hàng
      // 3: Đóng gói xong
      // 4: Đang vận chuyển
      // 5: Giao hàng thành công
      if (status === 0 || status === 1) {
        status = -1;
      } else {
        return res.json({ msg: 'Bạn không thể hủy đơn hàng.' });
      }
      order = await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { status } },
        { new: true }
      );
      return res.json({ msg: 'Đã hủy đơn hàng thành công.' });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/order/:orderId
  // @desc    Cập nhật trạng thái đơn hàng
  // @access  Private
  async updateOrderStatus(req, res) {
    try {
      let orderId = req.params.orderId;
      let order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ msg: 'Không tìm thấy đơn đặt hàng này.' });
      }
      let { status } = order;
      // -1: Hủy đơn hàng
      // 0: Đặt hàng thành công
      // 1: Đã xác nhận đơn hàng
      // 2: Đang lấy hàng
      // 3: Đóng gói xong
      // 4: Đang vận chuyển
      // 5: Giao hàng thành công
      if (status === -1) {
        return res.json({
          msg: 'Đơn hàng đã bị hủy. Không thể thay đổi trạng thái đơn hàng.',
        });
      } else if (status === 0) {
        status = 1;
      } else if (status === 1) {
        status = 2;
      } else if (status === 2) {
        status = 3;
      } else if (status === 3) {
        status = 4;
      } else if (status === 4) {
        status = 5;
      }
      order = await Order.findOneAndUpdate(
        { _id: orderId },
        { $set: { status } },
        { new: true }
      );
      return res.json(order);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new OrderController();
