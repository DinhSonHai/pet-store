/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "../../redux/actions/customers";
import { Button, Table, Pagination, Breadcrumb, Tooltip, Input } from "antd";
import CustomerDetails from "./Details";
import dayjs from "dayjs";

const { Search } = Input;
const Customer = ({ customers: { customers, total }, getAllCustomers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [record, setRecord] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(0);
  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số ĐT",
      dataIndex: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => {
        const address = value.find((item) => item.isDefault)?.value;
        return (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        );
      },
    },
    {
      title: "Ngày tạo tài khoản",
      dataIndex: "createdAt",
      render: (value) => <span>{dayjs(value).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) => (
        <Button
          onClick={() => {
            setRecord(record);
            setIsShowModal(true);
          }}
          type="primary"
        >
          Chi tiết
        </Button>
      ),
    },
  ];
  const getData = async (q, p) => {
    try {
      setIsLoading(true);
      await getAllCustomers(q, p);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData(searchState, page);
  }, [getAllCustomers, page]);
  const handlePagination = (_page) => {
    setPage(_page);
  };
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        setSearchState(e.target.value);
        getData(e.target.value, page);
      }, 500)
    );
  };
  return (
    <section className="receipt_page">
      <Breadcrumb style={{ margin: "1rem 2rem" }}>
        <Breadcrumb.Item>Quản lý người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="receipt__wrap site-layout-background"
        style={{ padding: "1.5rem", minHeight: "100vh" }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Search
            placeholder="Họ tên, email, sđt..."
            size="middle"
            allowClear
            onChange={handleSearch}
            enterButton
            loading={isLoading}
          />
        </div>
        <Table
          rowKey="userId"
          columns={columns}
          loading={isLoading}
          dataSource={customers}
          pagination={false}
        />

        <Pagination
          onChange={handlePagination}
          disabled={isLoading}
          current={!page ? 1 : parseInt(page)}
          responsive={true}
          pageSize={10}
          total={total}
          showSizeChanger={false}
          style={{ textAlign: "right", margin: "3rem 0 0 0" }}
        />
        <CustomerDetails
          setIsShowModal={setIsShowModal}
          isShowModal={isShowModal}
          record={record}
        />
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  customers: state.customers,
});
export default connect(mapStateToProps, { getAllCustomers })(Customer);
