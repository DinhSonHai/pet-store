import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Table, Pagination } from 'antd';
import queryString from 'query-string';
import {
  getRemovedProducts,
  restoreProduct,
} from '../../../redux/actions/products';

const ProductList = ({
  products: { products_removed, total_removed },
  getRemovedProducts,
  restoreProduct,
  tabChange,
}) => {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getRemovedProducts(page);
      setIsLoading(false);
    }
    if (tabChange === 'removed') {
      getData();
    }
  }, [getRemovedProducts, tabChange, page]);
  const restore = async (id) => {
    setIsLoading(true);
    await restoreProduct(id);
    setIsLoading(false);
  };
  const handlePagination = async (_page) => {
    return history.push(`?tab=product&page=${_page}`);
  };
  const columns = [
    {
      title: 'Tên SP',
      dataIndex: 'productName',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      render: (value) => (
        <span
          style={{
            color: value ? 'var(--success-color)' : 'var(--danger-color)',
          }}
        >
          {value ? 'Còn hàng' : 'Hết hàng'}
        </span>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Button onClick={() => restore(record.key)} type='link'>
            Khôi phục
          </Button>
        );
      },
    },
  ];
  return (
    <Fragment>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={products_removed}
        pagination={false}
      />

      <Pagination
        onChange={handlePagination}
        disabled={isLoading}
        current={!page ? 1 : parseInt(page)}
        responsive={true}
        pageSize={10}
        total={total_removed}
        showSizeChanger={false}
        style={{ textAlign: 'right', margin: '3rem 0 0 0' }}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, {
  getRemovedProducts,
  restoreProduct,
})(ProductList);
