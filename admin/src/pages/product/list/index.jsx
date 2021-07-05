import { useState, useEffect, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

// import { ReceiptModal, OrderModal } from '../../../components';
import ProductAddForm from '../add_form';
import { Button, Table, Popconfirm, Pagination, Space } from 'antd';
import queryString from 'query-string';
import { getAllProducts, removeProduct } from '../../../redux/actions/products';
import CustomInput from './components/CustomInput';
import { useDebounceValue } from '../../../hooks';

const defaultPage = 1;
const defaultPageSize = 10;

const defaultPageSetting = {
  currentPage: defaultPage,
  pageSize: defaultPageSize,
};

const ProductList = ({
  products: { products, total },
  getAllProducts,
  removeProduct,
  tabChange,
  setTabChange,
}) => {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;

  const [{ currentPage, pageSize }, setPage] = useState(page ? { currentPage: page, pageSize: defaultPageSize } : defaultPageSetting);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [item, setItem] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState(false);
  const [value, setValue] = useState('receipt');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const resetPageSetting = () => handlePagination(defaultPage);
  const searchKeyDebounced = useDebounceValue(searchText, 500, resetPageSetting);

  const getData = useCallback(async () => {
    setIsLoading(true);
    await getAllProducts(currentPage, searchKeyDebounced);
    setIsLoading(false);
  }, [currentPage, searchKeyDebounced]);

  useEffect(() => {
    getData();
  }, [getData]);

  // useEffect(() => {
  //   async function getData() {
  //     setIsLoading(true);
  //     await getAllProducts(filter, page);
  //     setIsLoading(false);
  //   }
  //   if (tabChange === 'list' && !edit && !visible && !view) {
  //     getData();
  //   }
  // }, [getAllProducts, tabChange, edit, filter, page, visible, view]);

  const remove = async (id) => {
    setIsLoading(true);
    await removeProduct(id);
    setIsLoading(false);
  };

  const onSelectChange = (_, selectedRows) => {
    let mapData = selectedRows.map((p) => ({
      key: p.key,
      productName: p.productName,
      quantity: p.quantity,
      quantityImport: 0,
      amount: 1,
      price: p.price,
    }));
    setSelectedRowKeys(_);
    setSelectedRows(mapData);
  };

  const handlePagination = async (_page) => {
    setPage({ currentPage: _page, pageSize: defaultPageSize });
    if (searchText) {
      return history.push(`?tab=product&page=${_page}&q=${searchText}`);
    }
    return history.push(`?tab=product&page=${_page}`);
  };

  const columns = [
    {
      title: 'Tên SP',
      dataIndex: 'productName',
      width: '40%',
    },
    {
      title: 'Đã bán / Số lượng',
      render: (_,record) => (
        <span>
         {record.sold} / {(record.quantity+record.sold)}
        </span>
      ),
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
          <Space>
            <Button
              type='primary'
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
              <Button danger type='primary'>
                Ẩn
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  
  const onChange = (e) => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setValue(e.target.value);
  };

  return (
    <Fragment>
      {!edit ? (
        <Fragment>
          {/* <Radio.Group onChange={onChange} value={value}>
            <Radio value={'receipt'}>Thêm phiếu nhập</Radio>
            <Radio value={'order'}>Thêm hóa đơn</Radio>
          </Radio.Group>
          {value === 'receipt' ? (
            <Button
              disabled={selectedRows.length > 0 ? false : true}
              style={{ margin: '1rem 0' }}
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setVisible(true)}
            >
              Thêm phiếu nhập
            </Button>
          ) : (
            value === 'order' && (
              <Button
                disabled={selectedRows.length > 0 ? false : true}
                style={{ margin: '1rem 0' }}
                icon={<PlusOutlined />}
                onClick={() => setView(true)}
              >
                Thêm hóa đơn
              </Button>
            )
          )}
          {visible && (
            <ReceiptModal setVisible={setVisible} data={selectedRows} />
          )}
          {view && <OrderModal setView={setView} data={selectedRows} />} */}
          <div style={{ marginBottom: '20px' }}>
            <CustomInput 
              handleOnChange={setSearchText}
              placeholder="Tên sản phẩm..."
            />
          </div>
          <Table
            rowSelection={{
              selectedRowKeys,
              selectedRows,
              onChange: onSelectChange,
              selections: [Table.SELECTION_NONE],
            }}
            columns={columns}
            loading={isLoading}
            dataSource={products}
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
            style={{ textAlign: 'right', margin: '3rem 0 0 0' }}
          />
        </Fragment>
      ) : (
        <ProductAddForm edit={edit} setEdit={setEdit} item={item} tabChange={tabChange} setTabChange={setTabChange} />
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
