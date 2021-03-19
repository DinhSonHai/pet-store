import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import {
  getRemovedCategories,
  restoreCategory,
} from '../../../redux/actions/categories';
const CategoryRemoved = ({
  categories: { categories_removed },
  getRemovedCategories,
  restoreCategory,
  tabChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getRemovedCategories();
      setIsLoading(false);
    }
    if (tabChange === 'removed') {
      getData();
    }
  }, [getRemovedCategories, tabChange]);
  const onRestore = async (key) => {
    setIsLoading(true);
    await restoreCategory(key);
    setIsLoading(false);
  };
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
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
  return (
    <Table
      pagination={{
        responsive: true,
        showSizeChanger: false,
      }}
      loading={isLoading}
      columns={columns}
      dataSource={categories_removed}
    />
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps, {
  getRemovedCategories,
  restoreCategory,
})(CategoryRemoved);
