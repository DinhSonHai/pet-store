/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  Checkbox,
  Space,
  DatePicker,
  Radio,
} from "antd";
import { connect } from "react-redux";
import { createPromo, editPromo } from "../../../redux/actions/promos";
import moment from "moment";
const PromoAddForm = ({
  createPromo,
  editPromo,
  edit,
  setEdit,
  setTabChange,
  item,
}) => {
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHaveCondition, setIsHaveCondition] = useState(false);
  const [discountType, setDiscountType] = useState("percent");

  useEffect(() => {
    if (edit) {
      form.resetFields();
      const { discountCondition, discountType } = item;
      setDiscountType(discountType);
      if (discountCondition) {
        setIsHaveCondition(true);
      }
    }
  }, [item]);

  const onFinish = async (values) => {
    const { enDate, ...data } = values;
    data.endDate = enDate ? new Date(enDate) : null;
    setIsProcessing(true);
    if (edit) {
      await editPromo(item._id, data);
      setIsProcessing(false);
      setEdit(false);
    } else {
      await createPromo(data);
      setIsProcessing(false);
      setTabChange("list");
    }
  };

  const hanldeSetDiscountType = (e) => {
    setDiscountType(e.target.value);
  };

  const handleSetCondition = (e) => {
    setIsHaveCondition(e.target.checked);
  };

  return (
    <Fragment>
      <h3 style={{ textAlign: "right" }}>
        {edit ? "Sửa promo" : "Thêm promo"}
      </h3>
      <Form form={form} size="large" layout="vertical" onFinish={onFinish}>
        <Form.Item
          initialValue={edit ? item.name : ""}
          label="Tên promo (không dấu, không khoảng cách)"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Tên promo!",
            },
          ]}
        >
          <Input placeholder="Tên promo..." />
        </Form.Item>

        <Form.Item
          initialValue={edit ? item.discountType : "percent"}
          label="Hình thức giảm giá"
          name="discountType"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn hình thức giảm giá!",
            },
          ]}
        >
          <Radio.Group onChange={hanldeSetDiscountType}>
            <Radio value={"percent"}>Theo phần trăm - %</Radio>
            <Radio value={"cash"}>Bằng tiền mặt - $</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          initialValue={edit && item.discountValue}
          label="Giá trị giảm"
          name="discountValue"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá trị giảm!",
            },
          ]}
        >
          <InputNumber
            size="large"
            style={{ width: "100%" }}
            min={0}
            max={discountType === "percent" ? 100 : Number.MAX_SAFE_INTEGER}
            placeholder={
              discountType === "percent" ? "Phần trăm giảm" : "Tiền giảm"
            }
          />
        </Form.Item>
        <Form.Item
          initialValue={edit ? (item?.endDate ? moment(item.endDate) : "") : ""}
          label="Thời gian áp dụng"
          name="enDate"
        >
          <DatePicker
            allowClear
            placeholder="Ngày hết hạn"
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Space style={{ margin: "1rem 0" }}>
          <Checkbox onChange={handleSetCondition} checked={isHaveCondition}>
            Điều kiện áp dụng
          </Checkbox>
        </Space>
        {isHaveCondition && (
          <Form.Item
            initialValue={edit && item.discountCondition}
            name="discountCondition"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nhập dữ liệu!",
              },
            ]}
          >
            <InputNumber
              size="large"
              style={{ width: "100%" }}
              min={0}
              max={Number.MAX_SAFE_INTEGER}
              placeholder="Áp dụng cho các đơn từ...$"
            />
          </Form.Item>
        )}
        <Form.Item style={{ textAlign: "right" }}>
          {edit && (
            <Button
              style={{ marginRight: "1rem" }}
              onClick={() => {
                setEdit(false);
              }}
            >
              Hủy
            </Button>
          )}
          <Button type="primary" loading={isProcessing} htmlType="submit">
            {edit ? "Lưu" : " Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
export default connect(null, { createPromo, editPromo })(PromoAddForm);
