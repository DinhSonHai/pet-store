import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Modal,
  Select,
  Spin,
} from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { typeAPI, productAPI } from '../../api';
import EditableTable from './components/EditableTable';
import {
  createReceipt,
  getAllReceiptsDetails,
} from '../../redux/actions/receipts';
import './styles.scss';

const { Option } = Select;

const ReceiptModal = ({
  visible,
  setVisible,
  auth: { user },
  createReceipt,
  receiptId,
  item,
  setView,
  getAllReceiptsDetails,
  receipts: { receipts_detail },
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectingType, setSelectingType] = useState(null);
  const [selectingProduct, setSelectingProduct] = useState(null);
  const [note, setNote] = useState('');
  const [productList, setProductList] = useState([]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleTypeChange = async (value) => {
    if (!value) {
      return;
    }
    setIsProcessing(true);
    const res = await productAPI.get_by_type(value);
    setProductOptions(res.data);
    setSelectingProduct(null);
    const type = typeOptions.find(item => item._id === value);
    if (!type) {
      return;
    }
    setSelectingType(type);
    setIsProcessing(false);
  };

  const handleProductChange = (value) => {
    if (!value) {
      return;
    }
    const product = productOptions.find(item => item._id === value);
    if (!product) {
      return;
    }
    setSelectingProduct(product);
  };

  const handleSelectProduct = () => {
    if (!selectingProduct) return;
    const currentProduct = selectingProduct;
    const currentProductList = [...productList];
    const existProduct = currentProductList.find(product => product._id === currentProduct._id);
    if (existProduct) {
      return;
    }
    currentProductList.push(currentProduct);
    setProductList(currentProductList);
    setAmount(currentProductList.length);
  };

  const onFinish = async () => {
    setConfirmLoading(true);
    await createReceipt(productList, note);
    setConfirmLoading(false);
    setVisible(false);
  };

  useEffect(() => {
    async function getType() {
      setIsProcessing(true);
      const res = await typeAPI.get_all_sell();
      setTypeOptions(res.data);
      setIsProcessing(false);
    };

    getType();
  }, [visible]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllReceiptsDetails(receiptId);
      setIsLoading(false);
    }
    if (receiptId) {
      getData();
    }
  }, [receiptId, getAllReceiptsDetails]);

  useEffect(() => {
    if (receiptId) {
      setProductList(receipts_detail);
    }
    else {
      setProductList([]);
    }
  }, [receipts_detail]);

  return (
    <Modal
      width={1200}
      onCancel={() => {
        if (setView) {
          setView(false);
        }
        if (setVisible) {
          setVisible(false);
        }
      }}
      footer={false}
      confirmLoading={confirmLoading}
      visible={true}
      centered
      maskClosable={false}
      title='Thông tin phiếu nhập'
    >
      <div className='receipt'>
        <p className='receipt__name'>
          {' '}
          <span>Người nhập phiếu: </span>{' '}
          {receiptId ? item.employeeId.name : user.name}
        </p>
        <p className='receipt__role'>
          {' '}
          <span>Vai trò: </span>{' '}
          {receiptId ? (item.employeeId.role === 0 ? 'Quản trị' : 'Nhân viên') : (user.role === 0
            ? 'Quản trị'
            : 'Nhân viên')}
        </p>
        <p className='receipt__amount'>
          {' '}
          <span>Số lượng sản phẩm: </span>{' '}
          {receiptId ? receipts_detail.length : amount}
        </p>
        <p className='receipt__date'>
          {' '}
          <span>Ngày nhập: </span>{' '}
          {receiptId ? dayjs(item.createdAt).format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY')}
        </p>
        {!item && (
          <>
            <span>Chọn sản phẩm:</span>
            <div className="product-container" style={{ marginTop: '12px' }}>
              <Select
                showSearch
                loading={isProcessing}
                style={{ width: '30%', marginRight: '12px' }}
                mode="single"
                placeholder="Chọn danh mục"
                onChange={handleTypeChange}
                optionFilterProp="children"
                filterOption={(input, option) =>  
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectingType ? selectingType._id : ""}
              >
                <Option value={""}>Chọn danh mục</Option>
                {typeOptions.map((type) => (
                  <Option
                    key={type._id}
                    value={type._id}
                  >
                    {type.typeName}
                  </Option>
                ))}
              </Select>
              <Select
                disabled={productOptions.length <= 0}
                showSearch
                loading={isProcessing}
                style={{ width: '60%', marginRight: '12px' }}
                mode="single"
                placeholder="Chọn sản phẩm"
                onChange={handleProductChange}
                optionFilterProp="children"
                filterOption={(input, option) =>  
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectingProduct ? selectingProduct._id : ""}
              >
                <Option value={""}>Chọn sản phẩm</Option>
                {productOptions.map((product) => (
                  <Option
                    key={product._id}
                    value={product._id}
                  >
                    {product.productName}
                  </Option>
                ))}
              </Select>
              <Button onClick={handleSelectProduct} type="default" disabled={!selectingProduct}>Xác nhận</Button>
            </div>
          </>
        )}
        {isLoading ? (<Spin size="large" />) : (
          productList.length > 0 && <EditableTable dataSource={productList} setDataSource={setProductList} setAmount={setAmount} receiptId={receiptId} />
        )}
        <p className='receipt__note'>
          <span>Note: </span>
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <Input.TextArea
            value={receiptId ? item.note : note}
            rows={4}
            onChange={handleNoteChange}
            disabled={Boolean(receiptId)}
          />
        </div>
      </div>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <Button
          style={{ marginRight: '1rem' }}
          disabled={confirmLoading}
          onClick={() => {
            if (setView) {
              setView(false);
            }
            if (setVisible) {
              setVisible(false);
            }
          }
        }
        >
          Hủy
        </Button>
        <Button type='primary' onClick={onFinish} loading={confirmLoading} disabled={productList.length <= 0 || productList.some(product => !product.quantityImport)}>
          {'Thêm'}
        </Button>
    </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  receipts: state.receipts,
});

export default connect(mapStateToProps, {
  createReceipt,
  getAllReceiptsDetails,
})(ReceiptModal);
