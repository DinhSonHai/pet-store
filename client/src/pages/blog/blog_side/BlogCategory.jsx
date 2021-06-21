import React from "react";
import { Link } from "react-router-dom";
import { BLOG_TAGS } from "../../../constants";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
const style = {
  color: "#106eea",
};

const BlogCategory = () => {
  const location = useLocation();
  let tags = queryString.parse(location.search).tags;
  return (
    <div className="blog-category">
      <div className="blog-title">
        <h4>Chuyên mục</h4>
      </div>
      <Link to={`/blogs`}>
        <span style={!tags ? style : {}}>Tất cả</span>
      </Link>
      {BLOG_TAGS.map((item) => (
        <Link key={item.value} to={`/blogs/?tags=${item.value}`}>
          <span style={tags === item.value ? style : {}}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BlogCategory;
