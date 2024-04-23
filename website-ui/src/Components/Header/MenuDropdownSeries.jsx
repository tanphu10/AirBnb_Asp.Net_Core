import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MenuDropdownSeries = (props) => {
  const { arraySeries } = props;
  // console.log(arraySeries);
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
  //   const menuItems = arraySeries.map((series, index) => ({
  //     label: series, // Assuming each item in arraySeries is a string
  //     key: index.toString(), // Converting index to string for unique keys
  //   }));

  const handleClickSeries = (id) => {
    // console.log(id);
  };
  const menuItems = arraySeries.map((series, index) => ({
    label: series.name, // Assuming each item in arraySeries is a string
    key: series.id, // Converting index to string for unique keys
  }));
  return (
    <Dropdown
      overlay={
        <Menu onClick={handleMenuClick}>
          {menuItems.map((item) => (
            <Menu.Item
              onClick={() => {
                console.log("check ", item);
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
          Loạt phòng
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MenuDropdownSeries;
