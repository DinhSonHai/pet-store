import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllReceipts } from '../../redux/actions/receipts';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Table, Pagination, Breadcrumb, Tooltip } from 'antd';
import { ReceiptModal } from '../../components';
import queryString from 'query-string';
import dayjs from 'dayjs';
const Receipt = ({ receipts: { receipts, total }, getAllReceipts }) => {
  const location = useLocation();
  const history = useHistory();
  let filter = queryString.parse(location.search).sort;
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(false);
  const [receiptId, setReceiptId] = useState(null);
  const [item, setItem] = useState(null);
  const columns = [
    {
      title: 'Mã phiếu nhập',
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
      title: 'Ngày nhập',
      dataIndex: 'createdAt',
      render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
    },
    {
      title: 'Người nhập',
      dataIndex: ['employeeId', 'name'],
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Button onClick={() => handleView(record)} type='link'>
            Xem
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllReceipts(filter, page);
      setIsLoading(false);
    }
    getData();
  }, [getAllReceipts, filter, page]);
  const handleView = (record) => {
    setReceiptId(record.key);
    setItem(record);
    setView(true);
  };
  const handlePagination = async (_page) => {
    if (filter) {
      return history.push(`?tab=receipt&sort=${filter}&page=${_page}`);
    }
    return history.push(`?tab=receipt&page=${_page}`);
  };
  return (
    <section className='receipt_page'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý phiếu nhập</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='receipt__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        {view && (
          <ReceiptModal item={item} receiptId={receiptId} setView={setView} />
        )}
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={receipts}
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
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  receipts: state.receipts,
});
export default connect(mapStateToProps, { getAllReceipts })(Receipt);
