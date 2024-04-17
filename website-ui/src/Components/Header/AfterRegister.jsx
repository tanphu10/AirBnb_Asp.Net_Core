import React, { useEffect } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dropdown, Space, message } from "antd";
import { getInfoUserApi, setDataName } from "../../redux/slices/userSlice";
import PressSign from "./PressSign";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { getUser, signOut } from "../../shared/function/token-storage";
const AfterRegister = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inFo } = useSelector((state) => state.user);
  // console.log(inFo);

  useEffect(() => {
    const userId = getUser()?.id;
    if (userId) {
      dispatch(getInfoUserApi(userId));
    }
  }, []);
  const logOut = () => {
    signOut();
    dispatch(setDataName(null));
    navigate("/");
    message.success("đăng xuất thành công");
  };
  const items = [
    {
      label: <NavLink to={"/infouser"}>Thông tin người dùng</NavLink>,
      key: "1",
      icon: <UserOutlined />,
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
                <img src={inFo?.avatar} alt="" />
              </div> ? (
                <div className="min-w-max">
                  <img
                    src={DOMAIN_BE_IMG + inFo?.avatar}
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
