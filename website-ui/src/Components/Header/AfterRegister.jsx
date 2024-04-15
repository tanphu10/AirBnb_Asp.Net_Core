import React, { useEffect } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  FolderOpenOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import SignIn from "../../pages/SignIn/SignIn";
import { Button, Dropdown, Space, message } from "antd";
import Header from "./Header.scss";
import { setDataName } from "../../redux/slices/userSlice";
import { layDuLieuLocal, xoaLocal } from "../../util/localStorage";
import { getInfoUserApi } from "../../redux/slices/adminUserSlices";
import PressSign from "./PressSign";
import { DOMAIN_BE_IMG } from "../../util/constants";
const AfterRegister = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inFo } = useSelector((state) => state.user);
  useEffect(() => {
    const nguoiDung = layDuLieuLocal("user")?.content?.user?.id;
    if (nguoiDung) {
      dispatch(getInfoUserApi(nguoiDung));
    }
  }, []);
  const { getUser } = useSelector((state) => state.adminUser);
  // console.log(getUser);
  const handleMenuClick = (e) => {
    // message.info("Log out Successed");
    // console.log("click", e);
  };
  const logOut = () => {
    xoaLocal("user");
    dispatch(setDataName(null));
    navigate("/");
    message.success("đăng xuất thành công");
  };
  const displayQuanTri = () => {
    const admin = layDuLieuLocal("user")?.content.user?.role;
    console.log(admin);
    if (admin == "ADMIN") {
      navigate("/admin-login");
      // console.log("chuyển đến admin");
    } else {
      navigate("/");
      // console.log("chuyển đến home");
    }
  };

  const items = [
    {
      label: <NavLink to={"/infouser"}>Thông tin người dùng</NavLink>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Quản Trị",
      key: "2",
      icon: <FolderOpenOutlined />,
      onClick: displayQuanTri,
    },
    {
      label: "Đăng Xuất",
      key: "4",
      icon: <LogoutOutlined />,
      onClick: logOut,
    },
  ];
  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };

  return (
    <div>
      {contextHolder}
      {inFo != null ? (
        <Space>
          <Dropdown menu={menuProps} placement="bottom">
            <Button
              style={{
                width: "100%",
                height: "100%",
                padding: "0",
                borderRadius: "50%",
              }}
            >
              {<div className="min-w-max">
                <img src={getUser?.avatar} alt="" />
              </div> ? (
                <div className="min-w-max">
                  <img
                    src={DOMAIN_BE_IMG + getUser?.avatar}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ) : (
                <div className="min-w-max">
                  <i className="text-orange-500 font-bold text-sm items-center fa-solid fa-user  "></i>
                </div>
              )}
            </Button>
          </Dropdown>
        </Space>
      ) : (
        <div>
          <PressSign />
        </div>
      )}
    </div>
  );
};

export default AfterRegister;
