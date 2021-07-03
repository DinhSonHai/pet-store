/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { Row, Col, Card, Form, Input, Button } from "antd";
import { notifySuccess, notifyErrors } from "../../../utils/notify";
import { contactAPI } from "../../../api";
import "./styles.scss";

const Contact = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onFinish = async (values) => {
    if (values) {
      setIsProcessing(true);
      try {
        const res = await contactAPI.create(values);
        notifySuccess(res.data.message);
        setIsProcessing(false);
      } catch (err) {
        notifyErrors(err);
        setIsProcessing(false);
      }
    }
  };
  return (
    <section className="contact">
      <div className="contact__wrap container">
        <p className="contact__heading">Contact</p>
        <h1 className="contact__title">
          <span>Liên hệ</span>
        </h1>
        <h4 className="contact__desc-head">
          Đừng ngần ngại liên hệ với chúng tôi để được hỗ trợ tư vấn, giải đáp
          các thắc mắc của bạn.
        </h4>
        <div className="contact__content">
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <iframe
                title="Address"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5558910970612!2d106.79455541518122!3d10.845258860884018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273e5b95f75d%3A0x774a073b596e07ab!2zNDg0IEzDqiBWxINuIFZp4buHdCwgVMSDbmcgTmjGoW4gUGjDuiBBLCBRdeG6rW4gOSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1624602810690!5m2!1svi!2s"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Card bordered={false}>
                <Form
                  layout="vertical"
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                    size: "large",
                  }}
                  size="large"
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên!",
                      },
                    ]}
                  >
                    <Input placeholder="Your name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Email không hợp lệ",
                      },
                      {
                        required: true,
                        message: "Vui lòng nhập email!",
                      },
                    ]}
                  >
                    <Input placeholder="Your email" />
                  </Form.Item>
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập nội dung!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Message"
                      rows={5}
                      showCount
                      maxLength={200}
                    />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "center" }}>
                    <Button
                      loading={isProcessing}
                      type="primary"
                      htmlType="submit"
                    >
                      Gửi message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
export default Contact;
