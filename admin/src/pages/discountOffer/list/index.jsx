/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Table, Pagination, Space, Popconfirm } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";

import ViewDiscountOffer from '../view/index';
import { getAllOffers, deleteOffer } from "../../../redux/actions/offers";
import OfferAddForm from "../add_form";

export const DiscountOfferContext = React.createContext(null);

function DiscountOfferList({ offers: { offers, total }, getAllOffers, deleteOffer, tabChange, setTabChange}) {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [id, setId] = useState(null);
  const [item, setItem] = useState(null);

  const handleDeleteOffer = async (id) => {
    await deleteOffer(id);
    getData();
  };

  const columns = [
    {
      width: "30%",
      title: "Tên Khuyến mãi",
      dataIndex: "title",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "from",
      render: (value) => <span>{dayjs(value).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "to",
      render: (value) => <span>{dayjs(value).format("DD/MM/YYYY HH:mm")}</span>
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (value) => (
        <span 
          style={{
            color: value ? 'var(--success-color)' : 'var(--danger-color)',
          }}
        >
          {value ? 'Đang hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Button
              onClick={() => handleViewOrder(record)}
            >Xem</Button>
            <Button
              type="primary"
              onClick={() => {
                setItem(record)
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm title="Bạn có muốn xóa?" onConfirm={() => handleDeleteOffer(record._id)}>
            <Button
              type="primary"
              danger
            >Xóa</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handlePagination = async (_page) => {
    return history.push(`?tab=discountOffer&page=${_page}`);
  };

  const handleViewOrder = (record) => {
    setId(record._id);
    setView(true);
  };

  const getData = async () => {
    setIsLoading(true);
    await getAllOffers(page);
    setIsLoading(false);
  }

  const context = {
    refetch: () => getData(),
  };

  useEffect(() => {
    if (tabChange === "list" && !edit) {
      getData();
    }
  }, [tabChange, page, edit]);

  return (
    <DiscountOfferContext.Provider value={context}>
      {view && <ViewDiscountOffer id={id} setView={setView} />}
      {!edit ? (
        <Fragment>
          <Table
            columns={columns}
            loading={isLoading}
            dataSource={offers}
            pagination={false}
          />
            <Pagination
            onChange={handlePagination}
            disabled={isLoading}
            current={!page ? 1 : parseInt(page)}
            responsive={true}
            pageSize={6}
            total={total}
            showSizeChanger={false}
            style={{ textAlign: 'right', margin: '3rem 0 0 0' }}
          />
        </Fragment>
      ) : (
        <OfferAddForm edit={edit} setEdit={setEdit} item={item} tabChange={tabChange} setTabChange={setTabChange}/>
      )}
    </DiscountOfferContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default connect(mapStateToProps, { getAllOffers, deleteOffer })(DiscountOfferList);
