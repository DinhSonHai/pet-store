import { useState, useEffect } from 'react';
import { Comment, Tooltip, List, Card, Rate } from 'antd';
import { Loader } from '../../../components';
import { getReviewByProductId } from '../../../redux/actions/review';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { timeSince } from '../../../utils/timesince.js';
import './styles.scss';
const DetailComments = ({ id, getReviewByProductId }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await getReviewByProductId(id);
      const mapData = res.map((item) => ({
        starRatings: item.starRatings,
        actions: [<span key='comment-list-reply-to-0'>Phản hồi</span>],
        author: item.name,
        avatar: item.avatar,
        content: <p>{item.comment}</p>,
        datetime: (
          <Tooltip title={dayjs(item.commentedAt).format('HH:mm DD/MM/YYYY')}>
            <span>{timeSince(item.commentedAt) + ' ago'}</span>
          </Tooltip>
        ),
      }));
      setData(mapData);
      setIsLoading(false);
    }
    getData();
  }, [id, getReviewByProductId]);
  return (
    <section className='pet-details__comments'>
      <Card>
        {isLoading ? (
          <Loader className='pet-details__comments--loader' />
        ) : data.length === 0 ? (
          <p>Chưa có đánh giá nào.</p>
        ) : (
          data.length > 0 && (
            <List
              className='comment-list'
              header={`${data.length} đánh giá`}
              itemLayout='horizontal'
              dataSource={data}
              renderItem={(item) => (
                <li style={{ margin: '0.5rem 0' }}>
                  <Rate
                    style={{ fontSize: '0.75rem' }}
                    disabled
                    defaultValue={item.starRatings}
                  />
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                </li>
              )}
            />
          )
        )}
      </Card>
    </section>
  );
};
export default connect(null, { getReviewByProductId })(DetailComments);
