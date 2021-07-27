import React from "react";
import { Tooltip, Table } from "antd";
import { TrophyFilled } from "@ant-design/icons";
import { GoldMedal, SilverMedal, BronzeMedal } from "../../../assets/icons";

const BestSeller = ({ isLoading, bestsellers }) => {
  const columns = [
    {
      title: "Ranking",
      dataIndex: "_id",
      width: "150px",
      render: (value) => {
        const idx = bestsellers?.findIndex((item) => item._id === value);
        if (idx === 0) {
          return (
            <span>
              <GoldMedal />
            </span>
          );
        } else if (idx === 1) {
          return (
            <span>
              <SilverMedal />
            </span>
          );
        } else {
          return (
            <span>
              <BronzeMedal />
            </span>
          );
        }
      },
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      width: "200px",
      render: (value) => {
        return <img src={value} alt="ok" className="thumbnail" />;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      ellipsis: {
        showTitle: false,
      },
      render: (value) => (
        <Tooltip placement="topLeft" title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      width: "200px",
    },
  ];
  return (
    <div className="bestseller">
      <h4>
        <TrophyFilled style={{ color: "#fdd835", fontSize: "2.5rem" }} /> Top 3
        sản phẩm bán chạy.
      </h4>
      <Table
        rowKey="_id"
        columns={columns}
        loading={isLoading}
        dataSource={bestsellers}
        pagination={false}
      />
    </div>
  );
};
export default BestSeller;
