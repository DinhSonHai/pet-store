import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllBlogs,
  getBlogsByTags,
  getSearchBlogsList,
} from "../../../redux/actions/blogs";
import { Card, Divider, Pagination, Tooltip, Tag } from "antd";
import { UserOutlined, HistoryOutlined } from "@ant-design/icons";
import Blog from "../Blog";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { TAGS_COLOR } from "../../../constants";
import { Loader } from "../../../components";
import queryString from "query-string";

const BlogList = ({
  blogs: { blogs, total },
  getAllBlogs,
  getBlogsByTags,
  getSearchBlogsList,
  history,
  location,
}) => {
  let page = queryString.parse(location.search).page;
  let tags = queryString.parse(location.search).tags;
  let q = queryString.parse(location.search).q;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      tags
        ? await getBlogsByTags(tags, page)
        : q
        ? await getSearchBlogsList(q, page)
        : await getAllBlogs(page);
      setIsLoading(false);
    }
    getData();
  }, [getAllBlogs, getBlogsByTags, getSearchBlogsList, q, tags, page]);
  const handlePagination = async (_page) => {
    if (tags) {
      return history.push(`/blogs/?tags=${tags}&page=${_page}`);
    }
    if(q){
      return history.push(`/blogs/?q=${q}&page=${_page}`);
    }
    return history.push(`/blogs/?page=${_page}`);
  };
  return (
    <Blog>
      {isLoading && <Loader className="product-loader" />}
      {blogs.map((item) => (
        <Fragment key={item._id}>
          <Link to={`/blogs/${item._id}`} className="blog-list__item">
            <img alt="example" src={item.thumbnail} />
            <Card bordered={false}>
              <p className="blog-list__title">
                <Tooltip placement="topLeft" title={item.title}>
                  {item.title}
                </Tooltip>
              </p>
              <p className="blog-list__info">
                <UserOutlined /> {item.employeeId.name} - <HistoryOutlined />{" "}
                {dayjs(item.createdAt).format("DD/MM/YYYY")}
              </p>
              <p className="blog-list__tags">
                {item.tags.map((tag) => (
                  <Link to={`/blogs/?tags=${tag}`}>
                    <Tag
                      key={tag}
                      color={TAGS_COLOR[Math.ceil(Math.random() * 8)]}
                    >
                      {tag}
                    </Tag>
                  </Link>
                ))}
              </p>
            </Card>
          </Link>
          <Divider />
        </Fragment>
      ))}
      <Pagination
        onChange={handlePagination}
        disabled={false}
        current={!page ? 1 : parseInt(page)}
        responsive={true}
        pageSize={6}
        total={total}
        showSizeChanger={false}
        style={{ textAlign: "center", margin: "3rem 0 1rem 0" }}
      />
    </Blog>
  );
};
const mapStateToProps = (state) => ({
  blogs: state.blogs,
});
export default connect(mapStateToProps, {
  getAllBlogs,
  getBlogsByTags,
  getSearchBlogsList,
})(BlogList);
