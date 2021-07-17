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
import { notifyActions } from "../../../utils/notify";
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
    const { enDate, discountCondition, discountValue } = values;
    // validate
    if (discountType === "percent" && discountValue <= 0) {
      return notifyActions("error", "Giá trị giảm ít nhất 1% trở lên");
    }
    if (discountType === "cash" && discountValue < 1000) {
      return notifyActions("error", "Giá trị giảm ít nhất 1.000 vnđ trở lên");
    }
    if (isHaveCondition && discountCondition < 1000) {
      return notifyActions("error", "Điều kiện giảm ít nhất 1.000 vnđ trở lên");
    }
    values.endDate = enDate ? new Date(enDate) : null;
    values.discountCondition = isHaveCondition ? discountCondition : 0;
    setIsProcessing(true);
    if (edit) {
      await editPromo(item._id, values);
      setIsProcessing(false);
      setEdit(false);
    } else {
      await createPromo(values);
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
        {edit ? "Sửa promotion" : "Thêm promotion"}
      </h3>
      <Form form={form} size="large" layout="vertical" onFinish={onFinish}>
        <Form.Item
          initialValue={edit ? item.name : ""}
          label="Tên promotion (không dấu, không khoảng cách)"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Tên promotion!",
            },
          ]}
        >
          <Input placeholder="Tên promotion..." />
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
          initialValue={edit ? item.discountValue : 0}
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
            min={discountType === "percent" ? 1 : 1000}
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
            initialValue={
              !edit
                ? 1000
                : edit && item.discountCondition < 1000
                ? 1000
                : item.discountCondition
            }
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
              min={1000}
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
