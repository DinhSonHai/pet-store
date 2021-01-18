process.env['NODE_CONFIG_DIR'] = __dirname;
const { validationResult } = require('express-validator');
const config = require('config');
const nodemailer = require('nodemailer');
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;
const dayjs = require('dayjs');

const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const User = require('../models/User');
const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');

// const api = axios.default.create({
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

class OrderController {
  // @route   GET api/orders/auth/:id
  // @desc    Lấy đơn hàng theo orderId phía người dùng
  // @access  Private
  async getById(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          errors: [
            {
              msg: 'Đơn hàng không tồn tại!',
            },
          ],
        });
      }
      if (order.userId.toString() !== req.user.id.toString()) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Đơn hàng phải của bạn đâu mà lấy!',
            },
          ],
        });
      }
      return res.json(order);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/orders/detail/auth/:id
  // @desc    Lấy chi tiết đơn hàng theo orderId phía người dùng
  // @access  Private
  async getOrdersDetailByOrderIdAuth(req, res) {
    try {
      const orders = await OrderDetail.find({
        userId: new ObjectId(req.user.id),
        orderId: new ObjectId(req.params.id),
      });
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/orders/orders_processing/auth
  // @desc    Lấy đơn hàng đang xử lí phía người dùng
  // @access  Private
  async getProcessingOrders(req, res) {
    try {
      const orders = await Order.find({
        userId: new ObjectId(req.user.id),
        status: { $gt: -1, $lt: 5 },
      }).sort({ createdAt: -1 });
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/orders/orders_completed/auth
  // @desc    Lấy đơn hàng hoàn tất phía người dùng
  // @access  Private
  async getCompletedOrders(req, res) {
    try {
      const orders = await Order.find({
        userId: new ObjectId(req.user.id),
        status: 5,
      }).sort({ createdAt: -1 });
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/orders/orders_canceled/auth
  // @desc    Lấy đơn hàng bị hủy phía người dùng
  // @access  Private
  async getCanceledOrders(req, res) {
    try {
      const orders = await Order.find({
        userId: new ObjectId(req.user.id),
        status: -1,
      }).sort({ createdAt: -1 });
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
  // @route   GET api/orders/admin/:id
  // @desc    Lấy đơn hàng theo orderId phía admin
  // @access  Private
  async getByIdAdmin(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          errors: [
            {
              msg: 'Đơn hàng không tồn tại!',
            },
          ],
        });
      }
      return res.json(order);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
  // @route   GET api/orders/detail/admin/:id
  // @desc    Lấy chi tiết đơn hàng theo orderId phía admin
  // @access  Private
  async getOrdersDetailByOrderIdAdmin(req, res) {
    try {
      const orders = await OrderDetail.find({
        orderId: new ObjectId(req.params.id),
      });
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
  // @route   GET api/orders/:status/admin
  // @desc    Lấy các đơn hàng theo trạng thái phía admin
  // @access  Private
  async getOrdersByStatusAdmin(req, res) {
    const status = parseInt(req.params.status) || 0;
    try {
      const orders = await Order.find({ status }).sort({ createdAt: 1 });
      return res.json(orders);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/orders
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

  // @route   POST api/orders
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
      deliveryState,
      paymentState,
      note,
      cart,
    } = req.body;
    // const checkVerifiedEmail = await api.get(
    //   `https://app.verify-email.org/api/v1/${config.get(
    //     'CHECK_VERIFIED_MAIL'
    //   )}/verify/${email}`
    // );
    // const { status } = checkVerifiedEmail.data;
    // if (!status || status === 0) {
    //   return res.status(400).json({
    //     errors: [{ msg: 'Vui lòng sử dụng email đã được kích hoạt' }],
    //   });
    // }
    let totalMoney = 0;
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
            deliveryState,
            paymentState,
          });
          order.key = order._id;
          order.amount = cartLength;
          let getProducts = [];
          if (order._id) {
            for (let i = 0; i < cartLength; ++i) {
              if (!cart[i].amount || parseInt(cart[i].amount <= 0)) {
                return res.status(400).json({
                  errors: [{ msg: 'Đơn hàng không hợp lệ!' }],
                });
              }
              const product = await Product.findById(cart[i]._id);
              if (!product) {
                return res.status(404).json({
                  errors: [{ msg: 'Sản phẩm không tồn tại!' }],
                });
              }
              if (product.quantity <= 0 || product.status === false) {
                return res.status(400).json({
                  errors: [{ msg: 'Sản phẩm hết hàng!' }],
                });
              }
              if (product.quantity < parseInt(cart[i].amount)) {
                return res.status(400).json({
                  errors: [{ msg: 'Số lượng mua vượt quá số lượng tồn kho!' }],
                });
              }
              product.quantity = product.quantity - parseInt(cart[i].amount);
              if (product.quantity <= 0) {
                product.status = false;
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
              await product.save();
            }
            totalMoney = getProducts.reduce(
              (a, b) => a + b.product.price * b.amount,
              deliveryState === 0 ? 35000 : 55000
            );
            order.totalMoney = totalMoney;
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
  // @route   POST api/orders/admin
  // @desc    Đặt hàng vai trò khách, xử lí ở admin
  // @access  Private
  async adminOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { note, cart, address, name, phone, email } = req.body;
    let totalMoney = 0;
    const cartLength = cart.length;
    let getProducts = [];
    if (!cart || cartLength <= 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Đơn hàng không hợp lệ!' }] });
    }
    try {
      const bill = new Bill({
        note,
        name,
        address,
        phone,
        email,
      });
      bill.key = bill._id;
      bill.amount = cartLength;
      if (bill._id) {
        for (let i = 0; i < cartLength; ++i) {
          if (!cart[i].amount || parseInt(cart[i].amount) <= 0) {
            return res.status(400).json({
              errors: [{ msg: 'Đơn hàng không hợp lệ!' }],
            });
          }
          const product = await Product.findById(cart[i].key);
          if (!product) {
            return res.status(404).json({
              errors: [{ msg: 'Sản phẩm không tồn tại!' }],
            });
          }
          if (product.quantity <= 0 || product.status === false) {
            return res.status(400).json({
              errors: [{ msg: 'Sản phẩm hết hàng!' }],
            });
          }
          if (product.quantity < parseInt(cart[i].amount)) {
            return res.status(400).json({
              errors: [{ msg: 'Số lượng mua vượt quá số lượng tồn kho!' }],
            });
          }
          product.quantity = product.quantity - parseInt(cart[i].amount);
          if (product.quantity <= 0) {
            product.status = false;
          }
          getProducts.push({ product, amount: cart[i].amount });
          const detail = new BillDetail({
            billId: bill._id,
            productId: product._id,
            productName: product.productName,
            amount: cart[i].amount,
            price: product.price,
          });
          detail.key = detail._id;
          await detail.save();
          await product.save();
        }
        totalMoney = getProducts.reduce(
          (a, b) => a + b.product.price * b.amount,
          0
        );
        bill.totalMoney = totalMoney;
        await bill.save();
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
          return res.json({ message: 'Đặt hàng thành công!' });
        })
        .catch((err) => {
          return res.status(400).json({
            errors: [{ msg: err.message }],
          });
        });
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/orders/auth
  // @desc    Đặt hàng vai trò người dùng
  // @access  Private
  async authOrder(req, res) {
    const { deliveryState, paymentState, note, cart, address } = req.body;
    let totalMoney = 0;
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
      if (user.address.length <= 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Vui lòng cung cấp địa chỉ!' }] });
      }
      let order = new Order({
        userId: user._id,
        name: user.name,
        phone: user.phoneNumber,
        email: user.email,
        address,
        note,
        deliveryState,
        paymentState,
      });
      order.key = order._id;
      order.amount = cartLength;
      let getProducts = [];
      if (order._id) {
        for (let i = 0; i < cartLength; ++i) {
          if (!cart[i].amount || parseInt(cart[i].amount) <= 0) {
            return res.status(400).json({
              errors: [{ msg: 'Đơn hàng không hợp lệ!' }],
            });
          }
          const product = await Product.findById(cart[i]._id);
          if (!product) {
            return res.status(404).json({
              errors: [{ msg: 'Sản phẩm không tồn tại!' }],
            });
          }
          if (product.quantity <= 0 || product.status === false) {
            return res.status(400).json({
              errors: [{ msg: 'Sản phẩm hết hàng!' }],
            });
          }
          if (product.quantity < parseInt(cart[i].amount)) {
            return res.status(400).json({
              errors: [{ msg: 'Số lượng mua vượt quá số lượng tồn kho!' }],
            });
          }
          const isPurchased = user.purchasedProducts.some(
            (item) => item.toString() === product._id.toString()
          );
          if (!isPurchased) {
            user.purchasedProducts = [
              product._id.toString(),
              ...user.purchasedProducts,
            ];
          }
          product.quantity = product.quantity - cart[i].amount;
          if (product.quantity <= 0) {
            product.status = false;
          }
          getProducts.push({ product, amount: cart[i].amount });
          let detail = new OrderDetail({
            userId: user._id,
            orderId: order._id,
            productId: product._id,
            productName: product.productName,
            amount: cart[i].amount,
            price: product.price,
          });
          detail.key = detail._id;
          await user.save();
          await detail.save();
          await product.save();
        }
        totalMoney = getProducts.reduce(
          (a, b) => a + b.product.price * b.amount,
          deliveryState === 0 ? 35000 : 55000
        );
        order.totalMoney = totalMoney;
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

  // @route   PUT api/orders/auth/:orderId
  // @desc    Hủy đơn hàng phía người dùng
  // @access  Private
  async cancleOrder(req, res) {
    try {
      let orderId = req.params.orderId;
      let order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đơn hàng!' }] });
      }
      if (order.userId.toString() !== req.user.id.toString()) {
        return res.status(400).json({
          errors: [{ msg: 'Bạn không có quyền thực hiện thao tác này!' }],
        });
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
        return res
          .status(400)
          .json({ errors: [{ msg: 'Bạn không thể hủy đơn hàng!' }] });
      }
      order.status = status;
      await order.save((err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Hủy đơn hàng thất bại!' }] });
        }
        return res.json({ message: 'Đã hủy đơn hàng thành công!' });
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/orders/admin/:orderId
  // @desc    Hủy đơn hàng phía admin
  // @access  Private
  async cancleOrderAdmin(req, res) {
    try {
      let orderId = req.params.orderId;
      let order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đơn hàng!' }] });
      }
      order.status = -1;
      await order.save((err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Hủy đơn hàng thất bại!' }] });
        }
        return res.json({ message: 'Đã hủy đơn hàng thành công!' });
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/orders/:orderId
  // @desc    Cập nhật trạng thái đơn hàng phía admin
  // @access  Private
  async updateOrderStatus(req, res) {
    try {
      let orderId = req.params.orderId;
      let order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đơn đặt hàng này!' }] });
      }
      let {
        status,
        address,
        name,
        phone,
        email,
        totalMoney,
        note,
        userId,
        createdAt,
        transportedAt,
      } = order;
      // -1: Hủy đơn hàng
      // 0: Đặt hàng thành công
      // 1: Đã xác nhận đơn hàng
      // 2: Đang lấy hàng
      // 3: Đóng gói xong
      // 4: Đang vận chuyển
      // 5: Giao hàng thành công
      if (status === -1) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'Đơn hàng đã bị hủy. Không thể thay đổi trạng thái đơn hàng.!',
            },
          ],
        });
      } else if (status === 0) {
        order.status = 1;
        order.confirmedAt = dayjs().toISOString();
      } else if (status === 1) {
        order.status = 2;
        order.pickedUpAt = dayjs().toISOString();
      } else if (status === 2) {
        order.status = 3;
        order.packedAt = dayjs().toISOString();
      } else if (status === 3) {
        order.status = 4;
        order.transportedAt = dayjs().toISOString();
      } else if (status === 4) {
        order.status = 5;
        order.deliveriedAt = dayjs().toISOString();
        const bill = new Bill({
          orderId: order._id,
          userId,
          address,
          name,
          phone,
          email,
          totalMoney,
          note,
          orderedAt: createdAt,
          deliveriedAt: transportedAt,
        });
        bill.key = bill._id;
        const detailOrders = await OrderDetail.find({
          orderId: new ObjectId(orderId),
        });
        let length = detailOrders.length;
        for (let i = 0; i < length; ++i) {
          const detail = new BillDetail({
            userId: detailOrders[i].userId,
            billId: bill._id,
            productId: detailOrders[i].productId,
            productName: detailOrders[i].productName,
            amount: detailOrders[i].amount,
            price: detailOrders[i].price,
          });
          detail.key = detail._id;
          await detail.save();
        }
        await bill.save();
      } else {
        return res.status(400).json({
          errors: [
            {
              msg: 'Không thể cập nhật đơn hàng!',
            },
          ],
        });
      }
      await order.save((err, data) => {
        if (err) {
          return res.status(400).json({
            errors: [
              {
                msg: 'Không thể cập nhật đơn hàng!',
              },
            ],
          });
        }
        return res.json({ message: 'Cập nhật đơn hàng thành công!' });
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
  // @route   GET api/orders/invoice/:id
  // @desc    Lấy dữ liệu in hóa đơn
  // @access  Private
  async invoice(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          errors: [
            {
              msg: 'Không tìm thấy đơn hàng!',
            },
          ],
        });
      }
      const detail = await OrderDetail.find({
        orderId: new ObjectId(req.params.id),
      });
      return res.json({ order, detail });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new OrderController();
