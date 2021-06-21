import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getNewestBlogs } from '../../../redux/actions/blogs'

const BlogNewest = ({ blogs: { newestBlogs }, getNewestBlogs } ) => {
    useEffect(()=>{
       getNewestBlogs();
    }, [getNewestBlogs])
  return (
    <div className="blog-newest">
      <div className="blog-title">
        <h4>Bài viết mới nhất</h4>
      </div>
      {newestBlogs.map((item) => (
        <Link key={item._id} to={`/blogs/${item._id}`}>
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};
const mapStateToProps = state =>({
    blogs: state.blogs
})
export default connect(mapStateToProps, { getNewestBlogs })(BlogNewest);
