import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Button, Table, Pagination, Breadcrumb, Tabs, Tooltip } from 'antd';
import { PrinterOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { getAllBills } from '../../redux/actions/bills';
const { TabPane } = Tabs;
const Bill = ({ bills: { bills, total }, getAllBills }) => {
  const location = useLocation();
  const history = useHistory();
  let filter = queryString.parse(location.search).sort;
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllBills(filter, page);
      setIsLoading(false);
    }
    getData();
  }, [getAllBills, filter, page]);

  const handlePagination = async (_page) => {
    if (filter) {
      return history.push(`?tab=bill&sort=${filter}&page=${_page}`);
    }
    return history.push(`?tab=bill&page=${_page}`);
  };
  const columns = [
    {
      title: 'Mã hóa đơn',
      dataIndex: '_id',
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement='topLeft' title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderedAt',
      render: (value) => <span>{dayjs(value).format('HH:mm DD/MM/YYYY')}</span>,
    },
    {
      title: 'Ngày giao',
      dataIndex: 'deliveriedAt',
      render: (value) => <span>{dayjs(value).format('HH:mm DD/MM/YYYY')}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalMoney',
      render: (value) => (
        <span>
          {parseInt(value).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Fragment>
            <Link to={`/invoice/bill/${record._id}`} target='_blank'>
              <Button type='link' icon={<PrinterOutlined />} />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  return (
    <section className='bill'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý hóa đơn</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='bill__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <Tabs onTabClick={onTabChange} defaultActiveKey={tabChange} type='card'>
          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                Danh sách
              </span>
            }
            key='list'
          >
            <Table
              columns={columns}
              loading={isLoading}
              dataSource={bills}
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
              style={{ textAlign: 'right', margin: '3rem 0 0 0' }}
            />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  bills: state.bills,
});
export default connect(mapStateToProps, { getAllBills })(Bill);
