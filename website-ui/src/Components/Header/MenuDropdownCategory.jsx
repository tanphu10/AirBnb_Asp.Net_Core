import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";

const MenuDropdownCategory = (props) => {
  const { arrayCate } = props;
  // console.log(arrayCate);
  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const menuItems = arrayCate.map((cate) => ({
    label: cate.name, // Assuming each item in arrayCate is a string
    key: cate.id, // Converting index to string for unique keys
  }));

  return (
    <Dropdown
      overlay={
        <Menu onClick={handleMenuClick}>
          {menuItems.map((item) => (
            <Menu.Item
              onClick={() => {
                console.log("check cate ", item);
              }}
              key={item.key}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      }
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Danh Mục
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MenuDropdownCategory;
