import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Col, Row, Card, Popconfirm, Input } from 'antd';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { DiscountOfferContext } from '../list';
import { getOfferById, activateOffer, deactivateOffer } from '../../../redux/actions/offers';

import './styles.scss';

function ViewDiscountOffer({ offers: { offer }, id, setView, getOfferById, activateOffer, deactivateOffer }) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { refetch } = useContext(DiscountOfferContext);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: ['productId', 'productName'],
      width: '40%',
    },
    {
      title: 'Đơn giá',
      dataIndex: ['productId', 'price'],
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
      title: 'Phần trăm giảm',
      dataIndex: 'discount',
      render: (value) => (<span>-{value}%</span>)
    },
    {
      title: 'Giá giảm',
      dataIndex: ['productId', 'discountPrice'],
      render: (value) => (
        <span>
          {offer.isActive ? parseInt(value).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }) : '-'}
        </span>
      ),
    },
  ];

  const activate = async () => {
    setConfirmLoading(true);
    await activateOffer(id);
    refetch();
    setConfirmLoading(false);
    setVisible(false);
    setView(false);
  };

  const deactivate = async () => {
    setConfirmLoading(true);
    await deactivateOffer(id);
    refetch();
    setConfirmLoading(false);
    setVisible(false);
    setView(false);
  };

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getOfferById(id);
      setIsLoading(false);
    }
    if (id) {
      getData();
    }
  }, [getOfferById, id]);

  return (
    <Modal
      centered
      width={1200}
      onCancel={() => {
        setView(false);
      }}
      footer={false}
      visible={true}
      maskClosable={false}
      title='Thông tin khuyến mãi'
    >
      <section className="view-offer">
        {!isLoading && offer && (
          <>
            <p className='view-offer__id'>
              <span>Chi tiết khuyến mãi: </span> {`#${id}`}
            </p>
            <p className='view-offer__id'>
              <span>Tên khuyến mãi: </span> {offer.title}
            </p>
            <p style={{ color: offer.isActive ? 'var(--success-color)' : 'var(--danger-color)'}} className='view-offer__status'>
              <span>Trạng thái: </span>
              {offer.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
            </p>
            <p className='view-offer__from'>
              <span>Ngày bắt đầu: </span>
              {dayjs(offer.from).format('HH:mm DD/MM/YYYY')}
            </p>
            <p className='view-offer__to'>
              <span>Ngày kết thúc: </span>
              {dayjs(offer.to).format('HH:mm DD/MM/YYYY')}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
                justifyContent: 'flex-end',
              }}
            >
              {offer.isActive ? (
                <Popconfirm
                  title='Hủy kích hoạt?'
                  visible={visible}
                  onConfirm={deactivate}
                  okButtonProps={{ loading: confirmLoading }}
                  cancelButtonProps={{ disabled: confirmLoading }}
                  onCancel={handleCancel}
                >
                  <Button onClick={showPopconfirm} danger>
                    Hủy kích hoạt
                  </Button>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title='Kích hoạt?'
                  visible={visible}
                  onConfirm={activate}
                  okButtonProps={{ loading: confirmLoading }}
                  cancelButtonProps={{ disabled: confirmLoading }}
                  onCancel={handleCancel}
                >
                  <Button onClick={showPopconfirm} type="primary">
                    Kích hoạt
                  </Button>
                </Popconfirm>
              )}
            </div>
            <Table
              loading={isLoading}
              scroll={{ y: 250 }}
              columns={columns}
              dataSource={offer.products}
              pagination={{
                responsive: true,
                showSizeChanger: false,
              }}
            />
          </>
        )}
      </section>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default connect(mapStateToProps, { getOfferById, activateOffer, deactivateOffer })(ViewDiscountOffer);
