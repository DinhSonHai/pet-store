import { useState, useEffect, Fragment, useCallback } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  Button,
  Table,
  Pagination,
  Breadcrumb,
  Tooltip,
  DatePicker,
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import queryString from "query-string";

import { getAllBills } from "../../redux/actions/bills";

const { RangePicker } = DatePicker;

const defaultPage = 1;
const defaultPageSize = 10;

const defaultPageSetting = {
  currentPage: defaultPage,
  pageSize: defaultPageSize,
};

const todayStart = moment().startOf("day");
const todayEnd = moment(todayStart).endOf("day");

const Bill = ({ bills: { bills, total }, getAllBills }) => {
  const location = useLocation();
  const history = useHistory();

  let page = queryString.parse(location.search).page;

  const [isLoading, setIsLoading] = useState(false);
  const [{ currentPage, pageSize }, setPage] = useState(
    page ? { currentPage: page, pageSize: defaultPageSize } : defaultPageSetting
  );
  const [from, setFrom] = useState(todayStart);
  const [to, setTo] = useState(todayEnd);
  const [isToday, setToday] = useState(false);

  const onDateChange = (value, dateString) => {
    if (dateString.length < 2) {
      return;
    }
    const startDate = Date.parse(dateString[0] + " 00:00:00");
    const endDate = Date.parse(dateString[1] + " 23:59:59");
    if (startDate === endDate) {
      return;
    }

    setToday(false);
    setFrom(startDate);
    setTo(endDate);
  };

  const handleTodayClick = () => {
    let dayStart = todayStart;
    let dayEnd = todayEnd;

    setToday(true);
    setFrom(dayStart.valueOf());
    setTo(dayEnd.valueOf());
  };

  const handleReset = () => {
    setToday(false);
    setFrom(todayStart);
    setTo(todayStart);
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (!from || !to || from === to) {
      await getAllBills(currentPage);
    } else {
      await getAllBills(currentPage, from, to);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, from, to]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePagination = async (_page) => {
    setPage({ currentPage: _page, pageSize: defaultPageSize });
    if (from && to && from !== to) {
      return history.push(`?tab=bill&page=${_page}&from=${from}&to=${to}`);
    }
    return history.push(`?tab=bill&page=${_page}`);
  };
  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "_id",
      ellipsis: {
        showTitle: false,
      },
      width: "30%",
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: "Người mua",
      dataIndex: "name",
    },
    {
      title: "Ngày giao",
      dataIndex: "deliveriedAt",
      render: (value) => <span>{dayjs(value).format("HH:mm DD/MM/YYYY")}</span>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalMoney",
      render: (value) => (
        <span>
          {parseInt(value).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Fragment>
            <Link to={`/invoice/bill/${record._id}`} target="_blank">
              <Button type="primary" icon={<PrinterOutlined />} />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  return (
    <section className="bill">
      <Breadcrumb style={{ margin: "1rem 2rem" }}>
        <Breadcrumb.Item>Quản lý hóa đơn</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="bill__wrap site-layout-background"
        style={{ padding: "1.5rem", minHeight: "100vh" }}
      >
        <div className="filter-container">
          <RangePicker
            style={{ marginRight: "24px" }}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            // showTime={{ defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')]}}
            format="YYYY-MM-DD"
            value={[moment(from), moment(to)]}
            onChange={onDateChange}
          />
          <Button onClick={handleTodayClick} className="filter-btn">
            Hôm nay
          </Button>
          <Button onClick={handleReset} className="filter-btn">
            Đặt lại
          </Button>
        </div>
        <div className="filter-detail">
          {isToday
            ? `Hóa đơn hôm nay: ${moment(new Date()).format("DD-MM-YYYY")}`
            : from &&
              to &&
              new Date(from).toDateString() !== new Date(to).toDateString() &&
              `Hoá đơn từ ${moment(from).format("DD-MM-YYYY")} đến ${moment(
                to
              ).format("DD-MM-YYYY")}`}
        </div>
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={bills}
          pagination={false}
        />
        <Pagination
          onChange={handlePagination}
          disabled={isLoading}
          current={!currentPage ? 1 : parseInt(currentPage)}
          responsive={true}
          pageSize={defaultPageSize}
          total={total}
          showSizeChanger={false}
          style={{ textAlign: "right", margin: "3rem 0 0 0" }}
        />
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  bills: state.bills,
});
export default connect(mapStateToProps, { getAllBills })(Bill);
