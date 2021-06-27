import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Table, Pagination } from "antd";
import {
  EyeOutlined,
} from '@ant-design/icons';
import dayjs from "dayjs";
import queryString from "query-string";

import ViewDiscountOffer from '../view/index';
import { getAllOffers } from "../../../redux/actions/offers";
import OfferAddForm from "../add_form";

export const DiscountOfferContext = React.createContext(null);

function DiscountOfferList({ offers: { offers, total }, getAllOffers, tabChange}) {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [id, setId] = useState(null);

  const columns = [
    {
      width: "30%",
      title: "Tên Khuyến mãi",
      dataIndex: "title",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "from",
      render: (value) => <span>{dayjs(value).format("HH:mm DD/MM/YYYY")}</span>,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "to",
      render: (value) => <span>{dayjs(value).format("HH:mm DD/MM/YYYY")}</span>
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
          <div>
            <Button
              onClick={() => handleViewOrder(record)}
              type='link'
              icon={<EyeOutlined />}
            />
            <Button
              type="link"
              onClick={() => {
                setEdit(true);
              }}
            >
              Sửa
            </Button>
          </div>
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
        <OfferAddForm edit={edit} setEdit={setEdit} />
      )}
    </DiscountOfferContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default connect(mapStateToProps, { getAllOffers })(DiscountOfferList);
