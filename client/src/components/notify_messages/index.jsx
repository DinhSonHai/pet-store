import React, { useState, useEffect } from "react";
import { Modal, Divider, Button } from "antd";
import store from "../../app/store";
import { getAllNotifications } from "../../redux/actions/notifications";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { HIDE_NOTIFY_MESSAGES } from "../../redux/types";
import "./styles.scss";

const NotifyMessages = ({
  notifications: { isShow, message },
  getAllNotifications,
}) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllNotifications();
      setIsLoading(false);
    }
    getData();
  }, [getAllNotifications]);
  const handleCancel = () => {
    store.dispatch({
      type: HIDE_NOTIFY_MESSAGES,
      payload: false,
    });
  };
  return (
    <Modal
      className="notify-messages"
      width="fit-content"
      visible={isShow && !isLoading && message}
      onCancel={handleCancel}
      footer={false}
    >
      <img
        className="notify-messages__banner"
        src={message?.banner}
        alt="ssss"
      />
      <div className="notify-messages__body">
        <div className="notify-messages__content">
          <h2 className="notify-messages__title">{message?.title}</h2>
          <p className="notify-messages__desc">{message?.descriptions}</p>
          <Button
            onClick={() => {
              handleCancel();
              history.push("/sales");
            }}
            shape="round"
            type="primary"
          >
            Shop now
          </Button>
        </div>
        <Divider />
        <div className="notify-messages__extra">
          PetStore đang có ưu đãi dành cho các khách hàng đăng ký vào sử dụng
          dịch vụ website, hãy <Link to="signin">đăng nhập</Link> hoặc{" "}
          <Link to="signup">đăng ký </Link>
          để nhận ưu đãi khủng từ PetStore nhé!
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  notifications: state.notifications,
});
export default connect(mapStateToProps, { getAllNotifications })(
  NotifyMessages
);
