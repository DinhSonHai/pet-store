import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PromoAddForm from '../add_form';
import { Button, Table, Popconfirm, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { getAllNotifications, removeNotification } from '../../../redux/actions/notifications';

const NotificationList = ({ notifications: { notifications }, getAllNotifications, removeNotification, tabChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllNotifications();
      setIsLoading(false);
    }
    if (tabChange === 'list' && !edit) {
      getData();
    }
  }, [getAllNotifications, tabChange, edit]);
  const remove = async (id) => {
    setIsLoading(true);
    await removeNotification(id);
    setIsLoading(false);
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'descriptions',
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (value) => <span>{value ? dayjs(value).format('HH:mm DD/MM/YYYY'): '---'}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      render: (value) => (
        <span 
          style={{
            color: value ? 'var(--success-color)' : 'var(--danger-color)',
          }}
        >
          {value ? 'Đang hoạt động' : 'Không hoạt động'}
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
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Fragment>
      {!edit ? (
        <Fragment>
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={notifications}
            pagination={{
              responsive: true,
              showSizeChanger: false,
            }}
          />
        </Fragment>
      ) : (
        <PromoAddForm edit={edit} setEdit={setEdit} item={item} />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  notifications: state.notifications,
});
export default connect(mapStateToProps, {
  getAllNotifications,
  removeNotification,
})(NotificationList);
