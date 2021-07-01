import React, { useState, useEffect } from "react";
import { UserOutlined, HistoryOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Blog from "../Blog";
import { ProductPostLoader, SocialShare } from "../../../components";
import { getBlogById } from "../../../redux/actions/blogs";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { TAGS_COLOR } from "../../../constants";

const BlogItem = ({ match, getBlogById, blogs: { blog } }) => {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    let flag = true;
    async function getData() {
      setIsloading(true);
      await getBlogById(match.params.id);
      setIsloading(false);
    }
    if (flag) {
      getData();
    }
    return () => (flag = false);
  }, [getBlogById, match.params.id]);
  return (
    <Blog>
      {isLoading ? (
        <ProductPostLoader />
      ) : (
        <div className="blog-item">
          <div className="blog-item__header">
            <img src={blog.thumbnail} alt="Okman" />
            <h1>{blog.title}</h1>
            <div className="blog-list__info list">
              <p>
                <UserOutlined /> {blog.employeeId.name} - <HistoryOutlined />{" "}
                {dayjs(blog.createdAt).format("DD/MM/YYYY")}

              </p>
              <SocialShare />
            </div>
            <p className="blog-list__tags">
              {blog.tags.map((tag) => (
                <Link key={tag} to={`/blogs/?tags=${tag}`}>
                  <Tag
                    key={tag}
                    color={TAGS_COLOR[Math.ceil(Math.random() * 8)]}
                  >
                    {tag}
                  </Tag>
                </Link>
              ))}
            </p>
          </div>
          <CKEditor
            data={blog.content || ""}
            config={{
              toolbar: false,
            }}
            disabled={true}
            editor={ClassicEditor}
          />
        </div>
      )}
    </Blog>
  );
};
const mapStateToProps = (state) => ({
  blogs: state.blogs,
});
export default connect(mapStateToProps, { getBlogById })(BlogItem);
