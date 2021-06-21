import React from "react";
import { Input } from "antd";

const { Search } = Input;
const BlogSearch = () => {
  return (
    <div className="blog-search">
      <div className="blog-title">
        <h4>Tìm kiếm</h4>
      </div>
      <Search placeholder="Search..." onSearch={() => {}} size="large" />
    </div>
  );
};
export default BlogSearch;
