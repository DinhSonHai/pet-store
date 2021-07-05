import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PromoAddForm from '../add_form';
import { Button, Table, Popconfirm, Space} from 'antd';
import dayjs from 'dayjs';

import { getAllPromos, removePromo } from '../../../redux/actions/promos';

const PromoList = ({ promos: { promos }, getAllPromos, removePromo, tabChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllPromos();
      setIsLoading(false);
    }
    if (tabChange === 'list' && !edit) {
      getData();
    }
  }, [getAllPromos, tabChange, edit]);
  const remove = async (id) => {
    setIsLoading(true);
    await removePromo(id);
    setIsLoading(false);
  };
  const columns = [
    {
      title: 'Tên promo',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'descriptions',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      render: (value) => <span>{value ? dayjs(value).format('HH:mm DD/MM/YYYY') : '---'}</span>,
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      render: (value) => <span>{value ? dayjs(value).format('HH:mm DD/MM/YYYY'): '---'}</span>,
    },
    {
      title: 'Trạng thái',
      render: (_, record) => {
      const {startDate, endDate } = record;
      const start = startDate && new Date(startDate);
      const end = endDate && new Date(endDate);
      const now = new Date(Date.now());
      if (end && now.getTime() >= end.getTime()) {
        return <span className="message-expired">expired</span>;
      }
      if (start && now.getTime() < start.getTime()) {
        return <span className="message-pending">pending</span>;
      }
      return <span className="message-valid">valid</span>;
    },
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
            dataSource={promos}
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
  promos: state.promos,
});
export default connect(mapStateToProps, {
  getAllPromos,
  removePromo,
})(PromoList);
