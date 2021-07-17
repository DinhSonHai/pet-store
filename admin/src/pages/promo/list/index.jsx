import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PromoAddForm from '../add_form';
import { Button, Table, Popconfirm, Space} from 'antd';
import dayjs from 'dayjs';

import { getAllPromos, removePromo } from '../../../redux/actions/promos';
import useCheckRole from '../../../hooks/useCheckRole';
import { ADMIN } from '../../../constants';

const PromoList = ({ promos: { promos }, getAllPromos, removePromo, tabChange }) => {
  const { role } = useCheckRole();

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
      title: 'Tên promotion',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'descriptions',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      render: (value) => <span>{value ? dayjs(value).format('HH:mm DD/MM/YYYY'): '---'}</span>,
    },
    {
      title: 'Trạng thái',
      render: (_, record) => {
      const { endDate } = record;
      const end = endDate && new Date(endDate);
      const now = new Date(Date.now());
      if (end && now.getTime() >= end.getTime()) {
        return <span className="message-expired">Hết hạn</span>;
      }
      return <span className="message-valid">Còn hạn</span>;
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
              title='Bạn có muốn xóa?'
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

  if (role !== ADMIN) {
    columns.splice(-1, 1);
  }

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
