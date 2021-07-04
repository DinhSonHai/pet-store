/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import { Form, Button, Input, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { createBlog, editBlog } from "../../../redux/actions/blog";
import { BLOG_TAGS } from "../../../constants";
const { Option } = Select;
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const BlogAddForm = ({ createBlog, editBlog, edit, setEdit, item, tabChange, setTabChange }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    form.resetFields();
    if (edit) {
      setContent(item.content);
      console.log(item.content)
      setImages([
        {
          uid: Math.random(),
          thumbUrl: item.thumbnail,
          response: { url: item.thumbnail },
        },
      ]);
    } else {
      setContent("");
      setImages([]);
    }
  }, [item, tabChange]);
  const onFinish = async (values) => {
    if (images.length <= 0) {
      values.thumbnail = "";
    } else {
      values.thumbnail = images[0].response.url;
    }
    setConfirmLoading(true);
    if (edit) {
      await editBlog(item._id, {
        ...values,
        content,
      });
    } else {
      await createBlog({
        ...values,
        content,
      });
    }
    setConfirmLoading(false);
    setTabChange('list');
    edit && setEdit(false);
  };
  const handleCkeditor = (event, editor) => {
    let data = editor.getData();
    setContent(data);
  };
  const handleAddThumbnail = ({ fileList }) => {
    setImages(fileList);
  };
  return (
    <Fragment>
      <h3 style={{ textAlign: "right" }}>
        {edit ? "Sửa bài viết" : "Thêm bài viết"}
      </h3>
      <Form
        encType="multipart/form-data"
        form={form}
        size="large"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={edit ? item.title : ""}
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Tiêu đề bài viết!",
            },
          ]}
        >
          <Input placeholder="Tiêu đề bài viết" />
        </Form.Item>
        <Form.Item
          initialValue={edit ? item.tags : []}
          label="Chuyên mục"
          name="tags"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn chuyên mục!",
            },
          ]}
        >
          <Select
            mode="multiple" 
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>  
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {BLOG_TAGS.map((tag) => (
              <Option key={tag.value} value={tag.value}>
                {tag.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Ảnh thumbnail" name="thumbnail">
          <Upload
            action="/uploadProduct"
            listType="picture-card"
            fileList={images}
            onChange={handleAddThumbnail}
          >
            {images.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item>
          <CKEditor
            data={item ? (content ? content : item.content) : content}
            config={{
              ckfinder: {
                uploadUrl: "/upload",
              },
            }}
            editor={ClassicEditor}
            onChange={handleCkeditor}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          {edit && (
            <Button
              style={{ marginRight: "1rem" }}
              onClick={() => {
                setContent("");
                setImages([]);
                setEdit(false);
              }}
            >
              Hủy
            </Button>
          )}

          <Button type="primary" loading={confirmLoading} htmlType="submit">
            {edit ? "Lưu" : " Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
export default connect(null, { createBlog, editBlog })(BlogAddForm);
