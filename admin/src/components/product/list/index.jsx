import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { ProductAddForm, ReceiptModal } from '../../../components';
import { Button, Table, Popconfirm, Pagination } from 'antd';
import queryString from 'query-string';
import { PlusOutlined } from '@ant-design/icons';
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllProducts(filter, page);
      setIsLoading(false);
    }
    if (tabChange === 'list' && !edit && !visible) {
      getData();
    }
  }, [getAllProducts, tabChange, edit, filter, page, visible]);
  const remove = async (id) => {
    setIsLoading(true);
    await removeProduct(id);
    setIsLoading(false);
  };
  const onSelectChange = (_, selectedRows) => {
    let mapData = selectedRows.map((p, index) => ({
      numericalOrder: index,
      key: p.key,
      productName: p.productName,
      quantity: p.quantity,
      price: p.price,
    }));
    setSelectedRows(mapData);
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
          <Button
            disabled={selectedRows.length > 0 ? false : true}
            style={{ margin: '1rem 0' }}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Thêm phiếu nhập
          </Button>
          {visible && (
            <ReceiptModal
              visible={visible}
              setVisible={setVisible}
              data={selectedRows}
            />
          )}

          <Table
            rowSelection={{
              selectedRows,
              onChange: onSelectChange,
            }}
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
