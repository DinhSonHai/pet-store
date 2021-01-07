import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { ProductAddForm } from '../../../components';
import { Button, Table, Popconfirm, Pagination } from 'antd';
import queryString from 'query-string';
import { getAllProducts, removeProduct } from '../../../redux/actions/products';

const ProductList = ({
  products: { products, total },
  getAllProducts,
  removeProduct,
  tabChange,
}) => {
  const location = useLocation();
  const history = useHistory();
  let filter = queryString.parse(location.search).sort;
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllProducts(filter, page);
      setIsLoading(false);
    }
    if (tabChange === 'list' && !edit) {
      getData();
    }
  }, [getAllProducts, tabChange, edit, filter, page]);
  const remove = async (id) => {
    setIsLoading(true);
    await removeProduct(id);
    setIsLoading(false);
  };
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const handlePagination = async (_page) => {
    if (filter) {
      return history.push(`?tab=product&sort=${filter}&page=${_page}`);
    }
    return history.push(`?tab=product&page=${_page}`);
  };
  const columns = [
    {
      title: 'Tên SP',
      dataIndex: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
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
          <Fragment>
            <Button
              type='link'
              onClick={() => {
                setItem(record);
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title='Sure to remove?'
              onConfirm={() => remove(record.key)}
            >
              <Button danger type='link'>
                Ẩn
              </Button>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Fragment>
      {!edit ? (
        <Fragment>
          <Table
            rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
            columns={columns}
            loading={isLoading}
            dataSource={products}
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
        </Fragment>
      ) : (
        <ProductAddForm edit={edit} setEdit={setEdit} item={item} />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, {
  getAllProducts,
  removeProduct,
})(ProductList);
