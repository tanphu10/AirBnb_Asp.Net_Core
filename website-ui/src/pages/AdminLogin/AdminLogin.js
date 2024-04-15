import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as loginAnimation from "./../../assets/animation/admin_login.json";
import FormAdminLogin from "../../Components/FormAdminLogin/FormAdminLogin";
import { layDuLieuLocal } from "../../util/localStorage";

const AdminLogin = () => {
  const navigate = useNavigate();
  const admin = layDuLieuLocal("admin");
  useEffect(() => {
    if (admin?.user?.role != "ADMIN" || admin == null) {
      return;
    } else {
      setTimeout(() => {
        alert("ĐÃ ĐĂNG NHẬP TÀI KHOẢN!!!");
        navigate("/admin");
      }, 3000);
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div className="header_admin1 h-14">
        <div className="bg-white h-full drop-shadow-md">
          <nav className="drop-shadow border-gray-200 ">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 sm:flex sm:justify-between ">
              <a href="#" className="flex items-center sm:text-sm ">
                <i
                  className="fa-brands fa-airbnb sm:text-sm"
                  style={{ color: "#ff5a1f", fontSize: "40px" }}
                />
                <span className="self-center font-bold text-orange-500 text-3xl whitespace-nowrap ml-3 sm:text-sm">
                  airbnb
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div className="admin_content flex">
        {/* <div className=" bg-gray-800 w-52 text-center h-screen">
          <div className="btn_admin w-full my-5 ">
            <NavLink to="user" className="w-full ">
              <button
                disabled
                className="text-white w-full py-3 px-5  bg-orange-500 text-sm hover:bg-orange-600 duration-500"
              >
                Người Dùng
              </button>
            </NavLink>
          </div>
          <div className="btn_admin  my-5">
            <NavLink to="room">
              <button
                disabled
                className="text-white w-full py-3 px-5 bg-orange-500 text-sm hover:bg-orange-600 duration-500"
              >
                Danh Sách Phòng
              </button>
            </NavLink>
          </div>
          <div className="btn_admin  my-5">
            <NavLink to="location">
              <button
                disabled
                className="text-white w-full py-3 px-5 bg-orange-500 text-sm hover:bg-orange-600 duration-500"
              >
                Địa Điểm
              </button>
            </NavLink>
          </div>
        </div> */}
        <div className="admin_leftconent m-5 flex flex-col items-center w-full">
          <div className="animation">
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>
          <div className="form_login_admin">
            <FormAdminLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
