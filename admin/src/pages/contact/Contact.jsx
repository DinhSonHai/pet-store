import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllContacts, updateContact } from "../../redux/actions/contacts";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Table, Pagination, Breadcrumb, Tooltip } from "antd";
import queryString from "query-string";
import dayjs from "dayjs";
const Contact = ({
  contacts: { contacts, total },
  getAllContacts,
  updateContact,
}) => {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: "Ngày liên hệ",
      dataIndex: "createdAt",
      render: (value) => <span>{dayjs(value).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Ngày xác nhận",
      dataIndex: "confirmedAt",
      render: (value) =>
        value ? <span>{dayjs(value).format("DD/MM/YYYY")}</span> : "---",
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) => {
        return record.status ? (
          <Button disabled type="link">
            Đã liên hệ
          </Button>
        ) : (
          <Button onClick={() => updateContact(record._id)} type="primary">
            Xác nhận
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllContacts(page);
      setIsLoading(false);
    }
    getData();
  }, [getAllContacts, page]);

  const handlePagination = async (_page) => {
    return history.push(`?tab=contacts&page=${_page}`);
  };
  return (
    <section className="receipt_page">
      <Breadcrumb style={{ margin: "1rem 2rem" }}>
        <Breadcrumb.Item>Quản lý contact</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="receipt__wrap site-layout-background"
        style={{ padding: "1.5rem", minHeight: "100vh" }}
      >
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={contacts}
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
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  contacts: state.contacts,
});
export default connect(mapStateToProps, { getAllContacts, updateContact })(
  Contact
);
