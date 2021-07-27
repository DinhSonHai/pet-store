import { useState, useEffect, Fragment, useCallback } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import ProductAddForm from "../add_form";
import { Button, Table, Popconfirm, Pagination, Space, Checkbox } from "antd";
import queryString from "query-string";
import {
  getAllProducts,
  getLowQuantityProducts,
  removeProduct,
} from "../../../redux/actions/products";
import CustomInput from "./components/CustomInput";
import { useDebounceValue } from "../../../hooks";
import useCheckRole from "../../../hooks/useCheckRole";
import { ADMIN } from "../../../constants";

const defaultPage = 1;
const defaultPageSize = 10;

const defaultPageSetting = {
  currentPage: defaultPage,
  pageSize: defaultPageSize,
};

const ProductList = ({
  products: { products, total },
  getAllProducts,
  getLowQuantityProducts,
  removeProduct,
  tabChange,
  setTabChange,
}) => {
  const { role } = useCheckRole();

  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;

  const [{ currentPage }, setPage] = useState(
    page ? { currentPage: page, pageSize: defaultPageSize } : defaultPageSetting
  );
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [item, setItem] = useState(null);
  const [isGetLowQtProducts, setIsGetLowQtProducts] = useState(false);

  const searchKeyDebounced = useDebounceValue(
    searchText,
    500,
    null
  );

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (isGetLowQtProducts) {
      await getLowQuantityProducts(currentPage, searchKeyDebounced);
    } else {
      await getAllProducts(currentPage, searchKeyDebounced);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchKeyDebounced, tabChange, edit, isGetLowQtProducts]);

  useEffect(() => {
    getData();
  }, [getData]);

  const remove = async (id) => {
    setIsLoading(true);
    await removeProduct(id);
    setIsLoading(false);
  };

  const handlePagination = async (_page) => {
    setPage({ currentPage: _page, pageSize: defaultPageSize });
    if (searchText) {
      return history.push(`?tab=product&page=${_page}&q=${searchText}`);
    }
    return history.push(`?tab=product&page=${_page}`);
  };

  const columns = [
    {
      title: "Tên SP",
      dataIndex: "productName",
      width: "40%",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (value) => (
        <span>
          {parseInt(value).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (value) => (
        <span
          style={{
            color: value ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {value ? "Còn hàng" : "Hết hàng"}
        </span>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setItem(record);
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có muốn ẩn?"
              onConfirm={() => remove(record.key)}
            >
              <Button danger type="primary">
                Ẩn
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
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomInput
              handleOnChange={setSearchText}
              placeholder="Tên sản phẩm..."
              style={{ maxWidth: "600px", width: "100%" }}
            />
            <Checkbox
              style={{ width: "fit-content" }}
              onChange={(e) => setIsGetLowQtProducts(e.target.checked)}
            >
              Sắp hết hàng
            </Checkbox>
          </div>
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={products}
            pagination={false}
          />

          <Pagination
            onChange={handlePagination}
            disabled={isLoading}
            current={!currentPage ? 1 : parseInt(currentPage)}
            responsive={true}
            pageSize={defaultPageSize}
            total={total}
            showSizeChanger={false}
            style={{ textAlign: "right", margin: "3rem 0 0 0" }}
          />
        </Fragment>
      ) : (
        <ProductAddForm
          edit={edit}
          setEdit={setEdit}
          item={item}
          tabChange={tabChange}
          setTabChange={setTabChange}
        />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});
export default connect(mapStateToProps, {
  getAllProducts,
  getLowQuantityProducts,
  removeProduct,
})(ProductList);
