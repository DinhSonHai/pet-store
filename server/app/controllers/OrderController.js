const { validationResult } = require('express-validator');
process.env["NODE_CONFIG_DIR"] = __dirname;
const config = require('config');
const nodemailer = require('nodemailer');

const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

class OrderController {
  // @route   POST api/order
  // @desc    Đặt hàng
  // @access  Public
  async order(req, res) {
    const userId = req.userId;
    const { address, email, totalMoney, note, cart } = req.body;
    try {
      //Tính tổng tiền
      //Thêm đơn đặt hàng vào bảng orders
      let order = new Order({
        userId,
        address,
        email,
        totalMoney,
        note
      })
      order = await order.save();
      if(order._id) {
        //Thêm từng sản phẩm vào bảng order_details
        cart.forEach(async cartItem => {
          let detail = new OrderDetail({
            orderId: order._id,
            productId: cartItem.productId,
            productName: cartItem.productName,
            quantity: cartItem.quantity,
            price: cartItem.price
          });
          detail.save();
        });

        //Gửi mail thông báo mua hàng đến cho khách nếu có nhập mail
        if(email) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.get('NODEMAILER_EMAIL'),
              pass: config.get('NODEMAILER_PASSWORD'),
            },
          });

          const item = cart.map((cartItem, index) => `<li>Sản phẩm ${index + 1}<ul><li>Tên sản phẩm: ${cartItem.productName}</li><li>Số lượng: ${cartItem.quantity}</li><li>Đơn giá mỗi sản phẩm: ${cartItem.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</li></ul></li>`);
    
          const content = `
            <h1>Bạn vừa mua hàng ở Pet store</h1>
            <p>Tổng giá trị đơn hàng: ${totalMoney.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
            <p>Đơn hàng của quý khách</p>
            <ul>
              ${item}
            </ul>
            <hr/>
            <p>Xin cảm ơn quý khách</p>
            <p>${config.get('CLIENT_URL')}</p>
          `;
    
          //step 2
          const mailOptions = {
            from: config.get('NODEMAILER_EMAIL'),
            to: email,
            subject: 'Thông báo mua hàng ở Pet store',
            html: content,
          };
    
          //step 3
          transporter
            .sendMail(mailOptions)
            .then(() => {
              
            })
            .catch((err) => {
              return res.status(400).json({
                error: err,
              });
            });
        }
      }
      res.json({ msg: 'Đặt hàng thành công'});
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new OrderController();
