import React from "react";
import { Button, Dropdown, Space } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import SignIn from "../../pages/SignIn/SignIn";
import Header from "./Header.scss";

const PressSign = () => {
  // const
  const items = [
    {
      label: <NavLink to={"/signup"}>Đăng Kí</NavLink>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: <SignIn />,
      key: "2",
      icon: <LoginOutlined />,
      // onClick: logOut,
    },
  ];
  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };
  return (
    <div>
      <Space>
        <Dropdown menu={menuProps} placement="bottom" id="displayIC">
          <Button
            // className="hover:bg-zinc-700"
            style={{
              width: "100%",
              height: "100%",
              padding: "0",
              borderRadius: "50%",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                lineHeight: "3",
              }}
            >
              <i className="text-orange-500 font-bold text-lg items-center fa-solid fa-user"></i>
            </div>
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
};

export default PressSign;
