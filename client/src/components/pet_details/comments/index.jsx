import { useState, useEffect, Fragment } from 'react';
import { Comment, Tooltip, Card, Rate, Avatar, Divider } from 'antd';
import { Loader } from '../../../components';
import { getReviewByProductId } from '../../../redux/actions/review';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { timeSince } from '../../../utils/timesince.js';
import './styles.scss';

const ExampleComment = ({ item }) => (
  <Fragment>
    <Rate
      style={{ fontSize: '0.75rem' }}
      disabled
      defaultValue={item.starRatings}
    />
    <Comment
      author={<p>{item.name}</p>}
      avatar={<Avatar src={item.avatar} alt='Avatar' />}
      content={<p>{item.comment}</p>}
      datetime={
        <Tooltip title={dayjs(item.commentedAt).format('HH:mm DD/MM/YYYY')}>
          <span>{timeSince(item.commentedAt) + ' ago'}</span>
        </Tooltip>
      }
    >
      {item.replyComment.length > 0 &&
        item.replyComment.map((sub, index) => (
          <Comment
            key={index}
            author={
              <p>
                {' '}
                {sub.adminReplyId &&
                  (sub.adminReplyId.role === 0 ||
                    sub.adminReplyId.role === 1) && (
                    <span
                      style={{
                        backgroundColor: 'var(--fourthstream-color)',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                      }}
                    >
                      QTV
                    </span>
                  )}{' '}
                {sub.name}
              </p>
            }
            avatar={<Avatar src={sub.avatar} alt='Avatar' />}
            content={<p>{sub.replyComment}</p>}
            datetime={
              <Tooltip
                title={dayjs(sub.replyCommentedAt).format('HH:mm DD/MM/YYYY')}
              >
                <span>{timeSince(sub.replyCommentedAt) + ' ago'}</span>
              </Tooltip>
            }
          />
        ))}
    </Comment>
  </Fragment>
);

const DetailComments = ({
  id,
  getReviewByProductId,
  auth: { user, isAuthenticated },
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await getReviewByProductId(id);
      setData(res);
      setIsLoading(false);
    }
    getData();
  }, [id, getReviewByProductId]);
  return (
    <section className='pet-details__comments'>
      <Card>
        {data.length > 0 && (
          <Fragment>
            <div className='ant-list-header'>{`${data.length} đánh giá`}</div>
            <Divider />
          </Fragment>
        )}
        {isLoading ? (
          <Loader className='pet-details__comments--loader' />
        ) : data.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Chưa có đánh giá nào.</p>
        ) : (
          data.length > 0 &&
          data.map((item) => (
            <ExampleComment
              key={item._id}
              isAuthenticated={isAuthenticated}
              user={user}
              item={item}
            />
          ))
        )}
      </Card>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getReviewByProductId })(
  DetailComments
);
