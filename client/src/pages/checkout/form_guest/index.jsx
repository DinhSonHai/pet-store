/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { addressAPI } from "../../../api";
import { Card, Form, Input, Select } from "antd";
import { notifyActions } from "../../../utils/notify";
import { GET_GUEST_INFO } from "../../../redux/types";
import store from "../../../app/store";

const { Option } = Select;
const handleSplitAddress = (str) => {
  let s = str.split(" ");
  let id = parseInt(s[0]);
  let addr = "";
  for (let i = 1; i < s.length; ++i) {
    addr += ` ${s[i]} `;
  }
  return { id, addr: addr.trim() };
};
const CheckoutFormGuest = ({ cartState, guestData, history }) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [ward, setWard] = useState([]);
  const [town, setTown] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countryState, setCountryState] = useState({
    p: "",
    w: "",
    t: "",
  });
  const [addressState, setAddressState] = useState({
    p: "",
    w: "",
    t: "",
  });
  useEffect(() => {
    async function getAddress() {
      if (guestData) {
        const [p, w, t] = await Promise.all([
          addressAPI.get_province(),
          addressAPI.get_ward(guestData.provinceState),
          addressAPI.get_town(guestData.wardState),
        ]);
        setProvince(p.data);
        setWard(w.data);
        setTown(t.data);
        setCountryState({
          p: guestData.provinceState,
          w: guestData.wardState,
          t: guestData.townState,
        });
      } else {
        const res = await addressAPI.get_province();
        setProvince(res.data);
      }
    }
    getAddress();
  }, []);

  const onChangeProvince = async (values) => {
    if (!values) {
      return;
    }
    form.setFieldsValue({
      wardState: "",
      townState: "",
    });
    const { id, addr } = handleSplitAddress(values);
    setIsProcessing(true);
    const res = await addressAPI.get_ward(id);
    setWard(res.data);
    setCountryState({ ...countryState, p: id });
    setAddressState({ ...addressState, p: addr });
    if (countryState.w || countryState.t) {
      setCountryState({ ...countryState, w: null, t: null });
    }
    setIsProcessing(false);
  };
  const onChangeWard = async (values) => {
    if (!values) {
      return;
    }
    form.setFieldsValue({
      townState: "",
    });
    const { id, addr } = handleSplitAddress(values);
    setIsProcessing(true);
    const res = await addressAPI.get_town(id);
    setTown(res.data);
    setCountryState({ ...countryState, w: id });
    setAddressState({ ...addressState, w: addr });
    if (countryState.t) {
      setCountryState({ ...countryState, t: null });
    }
    setIsProcessing(false);
  };
  const onChangeTown = (values) => {
    if (!values) {
      return;
    }
    const { id, addr } = handleSplitAddress(values);
    setCountryState({ ...countryState, t: id });
    setAddressState({ ...addressState, t: addr });
  };
  const onFinish = (values) => {
    const {
      name,
      phone,
      email,
      provinceState,
      wardState,
      townState,
      moreInfo,
      note,
    } = values;
    const { p, w, t } = countryState;
    if (!p || !w || !t) {
      return notifyActions(
        "error",
        "Vui lòng chọn Quận/Huyện hoặc Phường/Xã phù hợp!"
      );
    }
    const payload = {
      name,
      phone,
      email,
      address: `${moreInfo}, ${addressState.t}, ${addressState.w}, ${addressState.p}.`,
      provinceState: p ? handleSplitAddress(provinceState).id : p,
      wardState: w ? handleSplitAddress(wardState).id : w,
      townState: t ? handleSplitAddress(townState).id : t,
      moreInfo,
      note,
      cart: cartState.map((item) => ({ _id: item._id, amount: item.amount })),
    };
    localStorage.setItem("guestInfo", JSON.stringify(payload));
    store.dispatch({
      type: GET_GUEST_INFO,
      payload,
    });
    return history.push("/order");
  };
  return (
    <Card bordered={false}>
      <Form
        form={form}
        layout="vertical"
        name="normal_checkout"
        initialValues={{
          size: "large",
        }}
        size="large"
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={guestData ? guestData.name : ""}
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.phone : ""}
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.email : ""}
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.provinceState : ""}
          name="provinceState"
          label="Tỉnh/Thành Phố"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Tỉnh/Thành Phố!",
            },
          ]}
        >
          <Select
            loading={isProcessing}
            disabled={isProcessing}
            onChange={onChangeProvince}
          >
            <Option value={""}>Chọn Tỉnh/Thành Phố</Option>
            {province.map((item) => (
              <Option
                key={parseInt(item.province_id)}
                value={`${item.province_id} ${item.province_name}`}
              >
                {item.province_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.wardState : ""}
          name="wardState"
          label="Quận/Huyện"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Quận/Huyện!",
            },
          ]}
        >
          <Select
            loading={isProcessing}
            disabled={isProcessing}
            onChange={onChangeWard}
          >
            <Option value={""}>Chọn Quận/Huyện</Option>
            {ward.map((item) => (
              <Option
                key={parseInt(item.district_id)}
                value={`${item.district_id} ${item.district_name}`}
              >
                {item.district_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.townState : ""}
          name="townState"
          label="Phường/Xã"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn Phường/Xã!",
            },
          ]}
        >
          <Select
            onChange={onChangeTown}
            loading={isProcessing}
            disabled={isProcessing}
          >
            <Option value={""}>Chọn Phường/Xã</Option>
            {town.map((item) => (
              <Option
                key={parseInt(item.ward_id)}
                value={`${item.ward_id} ${item.ward_name}`}
              >
                {item.ward_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.moreInfo : ""}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ!",
            },
          ]}
          name="moreInfo"
          label="Địa chỉ"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          initialValue={guestData ? guestData.note : ""}
          name="note"
          label="Ghi chú"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CheckoutFormGuest;
