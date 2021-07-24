import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Card, Skeleton } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { customerAPI } from "../../api";
import {
  OrderCancel,
  OrderComplete,
  OrderProcessing,
} from "../../assets/icons";
import { notifyErrors } from "../../utils/notify";
import "./styles.scss";

const { Meta } = Card;
const CustomerDetails = ({ setIsShowModal, isShowModal, record }) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    async function getDetails() {
      if (record?._id) {
        try {
          setLoading(true);
          const res = await customerAPI.get_by_id(record?._id);
          setDetails(res.data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          notifyErrors(err);
        }
      }
    }
    getDetails();
  }, [record?._id]);
  return (
    <Modal
      title={`Thông tin người dùng: ${record?.name}`}
      visible={isShowModal}
      onCancel={() => setIsShowModal(false)}
      style={{ top: 20 }}
      width={1000}
      footer={[
        <Button key="back" onClick={() => setIsShowModal(false)}>
          Đóng
        </Button>,
      ]}
    >
      <div className="customer">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <p className="customer__name">
              <span>Tên người dùng: </span>
              {record?.name}
            </p>
            <p className="customer__email">
              <span>Email: </span>
              {record?.email}
            </p>
            <p className="customer__phone">
              <span>SĐT: </span>
              {record?.phoneNumber}
            </p>
            <p className="customer__address">
              <span>Địa chỉ: </span>
              {record?.address?.find((item) => item.isDefault)?.value}
            </p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <p className="customer__birthdate">
              <span>Ngày sinh: </span>
              {dayjs(record?.dateOfBirth).format("DD/MM/YYYY")}
            </p>
            <p className="customer__created">
              <span>Ngày tạo tài khoản: </span>
              {dayjs(record?.createdAt).format("DD/MM/YYYY")}
            </p>
            <p className="customer__gender">
              <span>Giới tính: </span>
              {record?.gender === 0
                ? "Nam"
                : record?.gender === 1
                ? "Nữ"
                : "Khác"}
            </p>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
              bordered={false}
              actions={[<EllipsisOutlined key="ellipsis" />]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  avatar={<OrderProcessing />}
                  title={`${details?.processingCount}`}
                  description="Đơn hàng đang xử lí"
                />
              </Skeleton>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
              bordered={false}
              actions={[<EllipsisOutlined key="ellipsis" />]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  avatar={<OrderComplete />}
                  title={`${details?.completeCount}`}
                  description="Đơn hàng đã hoàn tất"
                />
              </Skeleton>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
              bordered={false}
              actions={[<EllipsisOutlined key="ellipsis" />]}
            >
              <Skeleton loading={loading} avatar active>
                <Meta
                  avatar={<OrderCancel />}
                  title={`${details?.cancelCount}`}
                  description="Đơn hàng đã hủy"
                />
              </Skeleton>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default CustomerDetails;
