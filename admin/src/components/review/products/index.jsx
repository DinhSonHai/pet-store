import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getAllUncomfirmedReviews,
  approveReview,
} from '../../../redux/actions/reviews';
import { ReviewDetail } from '../../../components';
import { Button, Table, Tooltip, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
const ReviewsProducts = ({
  reviews: { reviewsOnProducts },
  getAllUncomfirmedReviews,
  approveReview,
  tabChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState(null);
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      width: '8%',
      render: (value) => (
        <img
          src={value}
          style={{
            width: 35,
            height: 35,
            objectFit: 'cover',
            borderRadius: '50%',
          }}
          alt='avt'
        />
      ),
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
    },
    {
      title: 'Ngày bình luận',
      dataIndex: 'commentedAt',
      render: (value) => <span>{dayjs(value).format('HH:mm DD/MM/YYYY')}</span>,
    },
    {
      title: 'Nội dung',
      dataIndex: 'comment',
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
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                handleApproveReview(record._id, record.productId._id)
              }
              type='link'
            >
              Duyệt
            </Button>{' '}
            |
            <Button
              type='link'
              onClick={() => {
                setData(record);
                setView(true);
              }}
            >
              Chi tiết
            </Button>
          </Fragment>
        );
      },
    },
  ];
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllUncomfirmedReviews();
      setIsLoading(false);
    }
    if (tabChange === 'reviews-products') {
      getData();
    }
  }, [getAllUncomfirmedReviews, tabChange, updateState]);
  const handleApproveReview = async (reviewId, productId) => {
    if (reviewId && productId) {
      setIsLoading(true);
      await approveReview(reviewId, productId);
      setIsLoading(false);
      return;
    }
    return message.error('Không thể duyệt bình luận!');
  };
  return (
    <Fragment>
      <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
        <Button
          icon={<SyncOutlined />}
          onClick={() => setUpdateState(!updateState)}
          disabled={isLoading}
        >
          Cập nhật
        </Button>
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={reviewsOnProducts}
        pagination={{
          responsive: true,
          showSizeChanger: false,
        }}
      />
      {view && (
        <ReviewDetail
          approveReview={approveReview}
          data={data}
          setView={setView}
        />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  reviews: state.reviews,
});
export default connect(mapStateToProps, {
  getAllUncomfirmedReviews,
  approveReview,
})(ReviewsProducts);
