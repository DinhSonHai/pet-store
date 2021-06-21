import React, { Fragment } from "react";
import { Divider } from "antd";
import BlogSearch from "./BlogSearch";
import BlogCategory from "./BlogCategory";
import BlogNewest from "./BlogNewest";
const BlogSide = () => {
  return (
    <Fragment>
      <BlogSearch />
      <Divider />
      <BlogCategory />
      <Divider />
      <BlogNewest />
    </Fragment>
  );
};
export default BlogSide;
