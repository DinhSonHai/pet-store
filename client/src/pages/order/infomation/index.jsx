import { Fragment } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";
const DataComponent = ({ data: { address, name, phone, email } }) => (
  <Fragment>
    <p>
      <span style={{ fontWeight: 600 }}>Địa chỉ: </span> {address}
    </p>
    <p>
      <span style={{ fontWeight: 600 }}>Họ tên: </span> {name}
    </p>
    <p>
      <span style={{ fontWeight: 600 }}>Điện thoại: </span> {phone}
    </p>
    <p>
      <span style={{ fontWeight: 600 }}>Email:</span> {email}
    </p>
  </Fragment>
);
const Information = ({ isAuthenticated, authState, guestState }) => {
  return (
    <Card
      style={{ marginBottom: "1rem" }}
      bordered={false}
      extra={
        <div className="checkout__update-cart">
          <CaretLeftOutlined />
          <Link to="/checkout">Sửa thông tin</Link>
        </div>
      }
      title="Thông tin giao hàng"
    >
      {isAuthenticated && authState ? (
        <DataComponent data={authState} />
      ) : (
        <DataComponent data={guestState} />
      )}
    </Card>
  );
};
export default Information;
