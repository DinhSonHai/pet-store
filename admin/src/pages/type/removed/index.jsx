import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';

import { getRemovedTypes, restoreType } from '../../../redux/actions/types';
import useCheckRole from '../../../hooks/useCheckRole';
import { ADMIN } from '../../../constants';

const TypeRemoved = ({
  types: { types_removed },
  getRemovedTypes,
  restoreType,
  tabChange,
}) => {
  const { role } = useCheckRole();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getRemovedTypes();
      setIsLoading(false);
    }
    if (tabChange === 'removed') {
      getData();
    }
  }, [getRemovedTypes, tabChange]);
  const onRestore = async (key) => {
    setIsLoading(true);
    await restoreType(key);
    setIsLoading(false);
  };
  const columns = [
    {
      title: 'Tên loại',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button onClick={() => onRestore(record.key)} type='link'>
          Khôi phục
        </Button>
      ),
    },
  ];

  if (role !== ADMIN) {
    columns.splice(-1, 1);
  }

  return (
    <Table
      pagination={{
        responsive: true,
        showSizeChanger: false,
      }}
      loading={isLoading}
      columns={columns}
      dataSource={types_removed}
    />
  );
};
const mapStateToProps = (state) => ({
  types: state.types,
});
export default connect(mapStateToProps, {
  getRemovedTypes,
  restoreType,
})(TypeRemoved);
