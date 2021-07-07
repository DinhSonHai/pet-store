/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import { Form, Button, Input, Checkbox, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  createNotification,
  editNotification,
} from "../../../redux/actions/notifications";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const NotificationAddForm = ({
  createNotification,
  editNotification,
  edit,
  setEdit,
  setTabChange,
  item,
}) => {
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (edit) {
      form.resetFields();
      const { banner } = item;
      setIsActive(item.isActive)
      if (banner) {
        setImages([
          {
            uid: Math.random(),
            thumbUrl: item.banner,
            response: { url: item.banner },
          },
        ]);
      }
    } else {
      setImages([]);
    }
  }, [item]);

  const onFinish = async (values) => {
    
    if (images.length <= 0) {
      values.banner = "";
    } else {
      values.banner = images[0].response.url;
    }
    values.isActive = isActive;
    setIsProcessing(true);
    if (edit) {
      await editNotification(item._id, values);
      setIsProcessing(false);
      setEdit(false);
    } else {
      await createNotification(values);
      setIsProcessing(false);
      setTabChange("list");
    }
  };

  const handleSetIsActive = (e) => {
    setIsActive(e.target.checked);
  };

  const handleAddBanner = ({ fileList }) => {
    setImages(fileList);
  };

  return (
    <Fragment>
      <h3 style={{ textAlign: "right" }}>
        {edit ? "Sửa promo" : "Thêm promo"}
      </h3>
      <Form form={form} size="large" layout="vertical" onFinish={onFinish}>
        <Form.Item
          initialValue={edit ? item.title : ""}
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề!",
            },
          ]}
        >
          <Input placeholder="Title..." />
        </Form.Item>
        <Form.Item
          initialValue={edit ? item.descriptions : ""}
          label="Mô tả"
          name="descriptions"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả!",
            },
          ]}
        >
          <Input placeholder="Descriptions..." />
        </Form.Item>
        <Form.Item label="Ảnh thumbnail" name="banner">
          <Upload
            action="/uploadProduct"
            listType="picture-card"
            fileList={images}
            onChange={handleAddBanner}
          >
            {images.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Space style={{ margin: "1rem 0" }}>
          <Checkbox onChange={handleSetIsActive} checked={isActive}>
            Kích hoạt
          </Checkbox>
        </Space>

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
export default connect(null, { createNotification, editNotification })(
  NotificationAddForm
);
