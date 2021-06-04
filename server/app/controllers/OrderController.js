const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const axios = require('axios');
const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const User = require('../models/User');
const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').order;
const crudService = require('../../services/crud');
const {
  NODEMAILER_EMAIL,
  NODEMAILER_PASSWORD,
  CLIENT_URL,
  STRIPE_SECRET,
} = require('../../config/default.json');
const stripe = require("stripe")(STRIPE_SECRET);

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
class OrderController {
  // @route   GET api/orders/auth/:id
  // @desc    Lấy đơn hàng theo orderId phía người dùng
  // @access  Private
  async getById(req, res) {
    try {
      const order = await crudService.getById(Order, req.params.id);
      if (!order) {
        return res.status(statusCode.notFound).json({
          errors: [
            {
              msg: message.notFound,
            },
          ],
        });
      }
      if (order.userId.toString() !== req.user.id.toString()) {
        return res.status(statusCode.badRequest).json({
          errors: [
            {
              msg: message.notOwn,
            },
          ],
        });
      }
      return res.status(statusCode.success).json(order);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/orders/detail/auth/:id
  // @desc    Lấy chi tiết đơn hàng theo orderId phía người dùng
  // @access  Private
  async getOrdersDetailByOrderIdAuth(req, res) {
    try {
      const orders = await crudService.getAll(OrderDetail, {
        userId: new ObjectId(req.user.id),
        orderId: new ObjectId(req.params.id),
      });
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/orders/orders_processing/auth
  // @desc    Lấy đơn hàng đang xử lí phía người dùng
  // @access  Private
  async getProcessingOrders(req, res) {
    try {
      const orders = await crudService.getAdvance(
        Order,
        {
          userId: new ObjectId(req.user.id),
          status: { $gt: -1, $lt: 5 },
        },
        { createdAt: 'desc' }
      );
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/orders/orders_completed/auth
  // @desc    Lấy đơn hàng hoàn tất phía người dùng
  // @access  Private
  async getCompletedOrders(req, res) {
    try {
      const orders = await crudService.getAdvance(
        Order,
        {
          userId: new ObjectId(req.user.id),
          status: 5,
        },
        { createdAt: 'desc' }
      );
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/orders/orders_canceled/auth
  // @desc    Lấy đơn hàng bị hủy phía người dùng
  // @access  Private
  async getCanceledOrders(req, res) {
    try {
      const orders = await crudService.getAdvance(
        Order,
        {
          userId: new ObjectId(req.user.id),
          status: -1,
        },
        { createdAt: 'desc' }
      );
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   GET api/orders/admin/:id
  // @desc    Lấy đơn hàng theo orderId phía admin
  // @access  Private
  async getByIdAdmin(req, res) {
    try {
      const order = await crudService.getById(Order, req.params.id);
      if (!order) {
        return res.status(statusCode.notFound).json({
          errors: [
            {
              msg: message.notFound,
            },
          ],
        });
      }
      return res.status(statusCode.success).json(order);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   GET api/orders/detail/admin/:id
  // @desc    Lấy chi tiết đơn hàng theo orderId phía admin
  // @access  Private
  async getOrdersDetailByOrderIdAdmin(req, res) {
    try {
      const orders = await crudService.getAll(OrderDetail, {
        orderId: new ObjectId(req.params.id),
      });
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   GET api/orders/:status/admin
  // @desc    Lấy các đơn hàng theo trạng thái phía admin
  // @access  Private
  async getOrdersByStatusAdmin(req, res) {
    const status = parseInt(req.params.status) || 0;
    try {
      const orders = await crudService.getAdvance(
        Order,
        { status },
        { createdAt: 'asc' }
      );
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/orders
  // @desc    Lấy tất cả đơn hàng phía admin
  // @access  Private
  async getAllOrderAdmin(req, res) {
    try {
      const orders = await crudService.getAdvance(Order, {}, { createdAt: -1 });
      return res.status(statusCode.success).json(orders);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   POST api/orders
  // @desc    Đặt hàng vai trò khách
  // @access  Public
  async guestOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
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
      paymentId,
    } = req.body;
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
          const province_name = results[0].find(
            (item) => item.province_id === provinceState
          ).province_name;
          const ward_name = results[1].find(
            (item) => item.district_id === wardState
          ).district_name;
          const town_name = results[2].find(
            (item) => item.ward_id === townState
          ).ward_name;
          const address =
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
              .status(statusCode.badRequest)
              .json({ errors: [{ msg: message.error }] });
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

          for (let i = 0; i < cartLength; ++i) {
            if (!cart[i].amount || parseInt(cart[i].amount <= 0)) {
              return res.status(statusCode.badRequest).json({
                errors: [{ msg: message.invalidOrder }],
              });
            }
            const product = await crudService.getById(Product, cart[i]._id);
            if (!product) {
              return res.status(statusCode.notFound).json({
                errors: [{ msg: message.error }],
              });
            }
            if (product.quantity <= 0 || product.status === false) {
              return res.status(statusCode.badRequest).json({
                errors: [{ msg: message.outOfStock }],
              });
            }
            if (product.quantity < parseInt(cart[i].amount)) {
              return res.status(statusCode.badRequest).json({
                errors: [{ msg: message.error }],
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
          totalMoney = getProducts.reduce(
            (a, b) => a + b.product.price * b.amount,
            deliveryState === 0 ? 35000 : 55000
          );
          const payment = await stripe.paymentIntents.create({
            amount: totalMoney,
            currency: "VND",
            payment_method: paymentId,
            confirm: true,
          });
          order.totalMoney = totalMoney;
          await order.save((err, _) => {
            if (err) {
              return res.status(statusCode.badRequest).json({
                errors: [{ msg: message.orderFail }],
              });
            }
            return res.status(statusCode.success).json({
              message: message.orderSuccess,
            });
          });
          if (email) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_PASSWORD,
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
          <p>${CLIENT_URL}</p>
        `;
            const mailOptions = {
              from: NODEMAILER_EMAIL,
              to: email,
              subject: 'Thông báo mua hàng ở Pet store',
              html: content,
            };
            transporter
              .sendMail(mailOptions)
              .then(() => {
                console.log('Send mail success');
              })
              .catch((err) => {
                console.log('Send mail fail');
              });
          }
        })
        .catch((err) =>
          res.status(statusCode.badRequest).json({
            errors: [{ msg: message.orderFail }],
          })
        );
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   POST api/orders/auth
  // @desc    Đặt hàng vai trò người dùng
  // @access  Private
  async authOrder(req, res) {
    const { deliveryState, paymentState, note, cart, address, paymentId } = req.body;
    let totalMoney = 0;
    try {
      let user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.userNotFound }] });
      }
      const cartLength = cart.length;
      if (!cart || cartLength <= 0) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.invalidOrder }] });
      }
      if (!user.phoneNumber) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.phoneRequired }] });
      }
      if (user.address.length <= 0) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.addressRequired }] });
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

      for (let i = 0; i < cartLength; ++i) {
        if (!cart[i].amount || parseInt(cart[i].amount) <= 0) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.invalidOrder }],
          });
        }
        const product = await crudService.getById(Product, cart[i]._id);
        if (!product) {
          return res.status(statusCode.notFound).json({
            errors: [{ msg: message.error }],
          });
        }
        if (product.quantity <= 0 || product.status === false) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.outOfStock }],
          });
        }
        if (product.quantity < parseInt(cart[i].amount)) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.error }],
          });
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
        await detail.save();
      }
      totalMoney = getProducts.reduce(
        (a, b) => a + b.product.price * b.amount,
        deliveryState === 0 ? 35000 : 55000
      );
      const payment = await stripe.paymentIntents.create({
        amount: totalMoney,
        currency: "VND",
        payment_method: paymentId,
        confirm: true,
      });
      order.totalMoney = totalMoney;
      await order.save((err, _) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [{ msg: message.orderFail }],
          });
        }
        return res.status(statusCode.success).json({
          message: message.orderSuccess,
        });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_PASSWORD,
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
          <p>${CLIENT_URL}</p>
        `;

      const mailOptions = {
        from: NODEMAILER_EMAIL,
        to: user.email,
        subject: 'Thông báo mua hàng ở Pet store',
        html: content,
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          console.log('Send mail success');
        })
        .catch((err) => {
          console.log('Send mail fail');
        });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/orders/auth/:orderId
  // @desc    Hủy đơn hàng phía người dùng
  // @access  Private
  async cancleOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      let order = await crudService.getById(Order, orderId);
      if (!order) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      if (order.userId.toString() !== req.user.id.toString()) {
        return res.status(statusCode.badRequest).json({
          errors: [{ msg: message.error }],
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
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.cancelProtect }] });
      }
      order.status = status;
      await order.save((err, _) => {
        if (err) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.cancelFail }] });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.cancelSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/orders/admin/:orderId
  // @desc    Hủy đơn hàng phía admin
  // @access  Private
  async cancleOrderAdmin(req, res) {
    try {
      const orderId = req.params.orderId;
      let order = await crudService.getById(Order, orderId);
      if (!order) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      order.status = -1;
      await order.save((err, data) => {
        if (err) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.cancelFail }] });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.cancelSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/orders/:orderId
  // @desc    Cập nhật trạng thái đơn hàng phía admin
  // @access  Private
  async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.orderId;
      let order = await crudService.getById(Order, orderId);
      if (!order) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
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
        return res.status(statusCode.badRequest).json({
          errors: [
            {
              msg: message.changeStatusProtect,
            },
          ],
        });
      } else if (status === 0) {
        order.status = 1;
        order.confirmedAt = new Date().toISOString();
      } else if (status === 1) {
        const detailOrders = await crudService.getAll(OrderDetail, {
          orderId: new ObjectId(orderId),
        });
        const length = detailOrders.length;
        for (let i = 0; i < length; ++i) {
          let product = await crudService.getById(
            Product,
            detailOrders[i].productId
          );
          if (!product) {
            return res.status(statusCode.notFound).json({
              errors: [{ msg: message.error }],
            });
          }
          product.quantity =
            product.quantity - parseInt(detailOrders[i].amount);
          product.sold = product.sold + parseInt(detailOrders[i].amount);
          if (product.quantity <= 0) {
            product.status = false;
          }
          await product.save();
        }
        order.status = 2;
        order.pickedUpAt = new Date().toISOString();
      } else if (status === 2) {
        order.status = 3;
        order.packedAt = new Date().toISOString();
      } else if (status === 3) {
        order.status = 4;
        order.transportedAt = new Date().toISOString();
      } else if (status === 4) {
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
        const detailOrders = await crudService.getAll(OrderDetail, {
          orderId: new ObjectId(orderId),
        });
        const length = detailOrders.length;
        if (userId) {
          let user = await crudService.getById(User, userId);
          if (!user) {
            return res
              .status(statusCode.notFound)
              .json({ errors: [{ msg: message.userNotFound }] });
          }
          for (let i = 0; i < length; ++i) {
            const isPurchased = user.purchasedProducts.some(
              (item) => item.toString() === detailOrders[i].productId.toString()
            );
            if (!isPurchased) {
              user.purchasedProducts = [
                detailOrders[i].productId.toString(),
                ...user.purchasedProducts,
              ];
            }
            await user.save();
          }
        }
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
        order.status = 5;
        order.deliveriedAt = new Date().toISOString();
      } else {
        return res.status(statusCode.badRequest).json({
          errors: [
            {
              msg: message.error,
            },
          ],
        });
      }
      await order.save((err, data) => {
        if (err) {
          return res.status(statusCode.badRequest).json({
            errors: [
              {
                msg: message.updateFail,
              },
            ],
          });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.updateSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   GET api/orders/invoice/:id
  // @desc    Lấy dữ liệu in hóa đơn
  // @access  Private
  async invoice(req, res) {
    try {
      const order = await crudService.getById(Order, req.params.id);
      if (!order) {
        return res.status(statusCode.notFound).json({
          errors: [
            {
              msg: message.notFound,
            },
          ],
        });
      }
      const detail = await crudService.getAll(OrderDetail, {
        orderId: new ObjectId(req.params.id),
      });
      return res.status(statusCode.success).json({ order, detail });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
}

module.exports = new OrderController();
