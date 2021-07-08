import React, { Fragment } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./styles.scss";

const Coupon = ({
  item,
  handleCancel,
  onFinish,
  promo,
  setPromo,
  isModal,
  isSelected,
}) => {
  const index = item?.descriptions.indexOf("cho");
  return (
    <div className="coupon">
      <div className="coupon__wrap">
        <div className="coupon__left">
          <h4 className="coupon__logo">PetStore.</h4>
        </div>
        <div className="coupon__divide" />
        <div className="coupon__right">
          <div className="coupon__right--info">
            {item?.discountCondition ? (
              <Fragment>
                <h4>{item?.descriptions.slice(0, index - 1)}</h4>
                <p style={{ marginBottom: "0.25rem" }}>
                  {item?.descriptions.slice(index)}
                </p>
              </Fragment>
            ) : (
              <h4>{item?.descriptions}</h4>
            )}
            <p>
              code: <span>{item?.name}</span>
            </p>
          </div>
          <div className="coupon__right--date">
            <p>
              HSD:{" "}
              {item?.endDate
                ? dayjs(item?.endDate).format("HH:mm DD/MM/YYYY")
                : "---"}
            </p>
          </div>
        </div>
        {isModal ? (
          <div
            onClick={() => {
              if (promo?._id === item?._id) {
                handleCancel(false);
                return;
              }
              onFinish(item);
            }}
            className={
              promo?._id !== item?._id ? "coupon__close" : "coupon__select"
            }
          >
            {promo?._id === item?._id ? <CloseOutlined /> : <PlusOutlined />}
          </div>
        ) : (
          isSelected && (
            <div
              onClick={() => {
                if (setPromo) {
                  setPromo(null);
                }
              }}
              className="coupon__select"
            >
              <CloseOutlined />
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default Coupon;
