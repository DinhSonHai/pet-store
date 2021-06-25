import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Table, Popconfirm, Tag, Pagination } from "antd";
import { getAllBlogs, removeBlog } from "../../../redux/actions/blog";
import BlogAddForm from "../add_form";
import dayjs from "dayjs";
import queryString from "query-string";

const colors = [
  "magenta",
  "red",
  "orange",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const BlogList = ({ blogs: { blogs, total }, getAllBlogs, removeBlog, tabChange }) => {
  const location = useLocation();
  const history = useHistory();
  let page = queryString.parse(location.search).page;
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllBlogs(page);
      setIsLoading(false);
    }
    if (tabChange === "list" && !edit) {
      getData();
    }
  }, [getAllBlogs, tabChange, page, edit]);
  const handlePagination = async (_page) => {
    return history.push(`?tab=blog&page=${_page}`);
  };
  const remove = async (id) => {
    setIsLoading(true);
    await removeBlog(id);
    setIsLoading(false);
  };
  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (value) => <span>{dayjs(value).format("HH:mm DD/MM/YYYY")}</span>,
    },
    {
      title: "Người tạo",
      dataIndex: ["employeeId", "name"],
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (value) => (
        <div>
          {value.map((item) => (
            <Tag color={colors[Math.ceil(Math.random() * 8)]}>{item}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <Fragment>
            <Button
              type="link"
              onClick={() => {
                setItem(record);
                setEdit(true);
              }}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Sure to remove?"
              onConfirm={() => remove(record.key)}
            >
              <Button danger type="link">
                Xóa
              </Button>
            </Popconfirm>
          </Fragment>
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
            dataSource={blogs}
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
        <BlogAddForm edit={edit} setEdit={setEdit} item={item} />
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  blogs: state.blogs,
});
export default connect(mapStateToProps, {
  getAllBlogs,
  removeBlog,
})(BlogList);
