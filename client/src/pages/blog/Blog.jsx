import React from "react";
import { Row, Col } from "antd";
import BlogSide from "./blog_side";
import './styles.scss'

const Blog = ({ children }) => {
  return (
    <section className="blog container">
      <Row gutter={[44, 0]}>
        <Col className="blog-list" xs={24} sm={24} md={24} lg={16}>
          {children}
        </Col>
        <Col className="blog-side" xs={0} sm={0} md={0} lg={8}>
          <BlogSide />
        </Col>
      </Row>
    </section>
  );
};
export default Blog;