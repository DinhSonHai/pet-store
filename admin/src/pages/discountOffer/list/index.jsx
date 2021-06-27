import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Table, Pagination } from "antd";
import { getAllOffers, activateOffer, deactivateOffer } from "../../../redux/actions/offers";
// import BlogAddForm from "../add_form";
import dayjs from "dayjs";
import queryString from "query-string";

function DiscountOfferList({ offers: { offers, total }, getAllOffers, activateOffer, deactivateOffer, tabChange}) {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);

  const columns = [
    {
      width: "40%",
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
      render: (value) => <span>{value ? 'Đang hoạt động' : 'Không hoạt động'}</span>
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      align: 'center',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              type="link"
              onClick={() => {
                setItem(record);
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Button
              disabled={record.isActive}
              type="primary"
              onClick={() => { activate(record._id) }}
            >
              Kích hoạt
            </Button>
            <Button
              disabled={!record.isActive}
              type="link"
              danger
              onClick={() => { deactivate(record._id) }}
            >
              Hủy kích hoạt
            </Button>
          </div>
        );
      },
    },
  ];

  const activate = async (id) => {
    setIsLoading(true);
    await activateOffer(id);
    getAllOffers();
    setIsLoading(false);
  };

  const deactivate = async (id) => {
    setIsLoading(true);
    await deactivateOffer(id);
    getAllOffers();
    setIsLoading(false);
  };

  const handlePagination = async (_page) => {
    return history.push(`?tab=discountOffer&page=${_page}`);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllOffers(page);
      setIsLoading(false);
    }
    if (tabChange === "list" && !edit) {
      getData();
    }
  }, [getAllOffers, tabChange, page, edit]);

  return (
    <Fragment>
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
        // <BlogAddForm edit={edit} setEdit={setEdit} item={item} />
        <></>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default connect(mapStateToProps, { getAllOffers, activateOffer, deactivateOffer })(DiscountOfferList);
