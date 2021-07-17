import React from "react";
import { Input } from "antd";
import { useHistory } from "react-router-dom";

const { Search } = Input;
const BlogSearch = () => {
  const history = useHistory();
  return (
    <div className="blog-search">
      <div className="blog-title">
        <h4>Tìm kiếm</h4>
      </div>
      <Search
        placeholder="Search..."
        onSearch={(value) => {
          if (value) {
            return history.push(`/blogs/?q=${value}`);
          }
          else {
            return history.push(`/blogs`);
          }
        }}
        size="large"
      />
    </div>
  );
};
export default BlogSearch;
