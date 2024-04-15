import React, { Fragment, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { https } from "../services/config";
import Loading from "../pages/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserApi } from "../redux/slices/adminUserSlices";
import { layDuLieuLocal } from "../util/localStorage";
import { DOMAIN_BE_IMG } from "../util/constants";
// import hinhAnh from "./image.jpg";
const AdminTemplate = () => {
  const [active, setactive] = useState(false);
  const handleActive = () => {
    setactive(!active);
  };
  const dispatch = useDispatch();
  const maNguoiDung = layDuLieuLocal("user")?.content.user.id;
  useEffect(() => {
    dispatch(getInfoUserApi(maNguoiDung));
  }, []);
  const { getUser } = useSelector((state) => state.adminUser);

  const { isLoading } = useSelector((state) => state.loading);
  return (
    <Fragment>
      {isLoading ? <Loading /> : <></>}
      <div id="haha" className=" flex flex-col min-h-full  justify-between">
        <div className="header h-16">
          <div className="container-lg">
            <div className="bg-white drop-shadow-md fixed w-full z-999">
              <nav className="border-gray-200 ">
                <div className="header_content max-w-screen-xl flex items-center p-4 justify-between  laptop:justify-start desktop:justify-start">
                  <NavLink to={"/"} className="flex items-center sm:text-sm ">
                    <i
                      className="fa-brands fa-airbnb sm:text-sm"
                      style={{ color: "#ff5a1f", fontSize: "40px" }}
                    />
                    <span className="self-center font-bold text-orange-500 text-3xl whitespace-nowrap ml-3 sm:text-sm">
                      airbnb
                    </span>
                  </NavLink>
                  <div onClick={handleActive} className="block laptop:hidden">
                    {!active ? (
                      <i class="fa-solid fa-xmark"></i>
                    ) : (
                      <i class="fa-solid fa-bars"></i>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="admin_content grid grid-cols-12 ">
          <div className="bg-slate-700 mobile:hidden laptop:flex  desktop:flex   hidden  col-span-2 text-center min-h-screen ">
            <div className="w-[100%]">
              <div className="sticky top-28">
                <div
                  className="mx-auto mt-2 "
                  style={{ width: "150px", height: "150px" }}
                >
                  {getUser.avatar ? (
                    <img
                      style={{ height: "100%", borderRadius: "60%" }}
                      src={DOMAIN_BE_IMG + getUser.avatar}
                      alt=""
                    />
                  ) : (
                    <div
                      className="bg-slate-600 text-center"
                      style={{
                        width: "150px",
                        height: "150px",
                        lineHeight: "8",
                        borderRadius: "50%",
                      }}
                    >
                      <div className="">
                        <i
                          className="fa-solid fa-user "
                          style={{ width: "150px", height: "150px" }}
                        ></i>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-orange-600 font-bold underline-offset-2">
                  Trang Quản Trị Airbnb
                  {/* <hr /> */}
                  <h3 className="text-sky-600 mb-5 underline-offset-1 left-0 ">
                    Admin:{" "}
                    <span className="text-yellow-300 font-bold uppercase">
                      {layDuLieuLocal("user")?.content.user.full_name}
                    </span>
                  </h3>
                  <hr />
                </h3>

                <ul>
                  <li>
                    {" "}
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "black", backgroundColor: "green" }
                          : {}
                      }
                      to="user"
                      className="w-full py-3"
                    >
                      <button className="text-white w-full py-3 text-sm ">
                        Người Dùng
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                  <li>
                    {" "}
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "dark", backgroundColor: "green" }
                          : {}
                      }
                      to="rent"
                      className="w-full py-3"
                    >
                      <button className="text-white w-full py-3 px-5 text-sm ">
                        Danh Sách Thuê Phòng
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                  <li>
                    {" "}
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "dark", backgroundColor: "green" }
                          : {}
                      }
                      to="room"
                      className="w-full py-3"
                    >
                      <button className="text-white w-full py-3 px-5 text-sm ">
                        Danh Sách Phòng
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                  <li>
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "dark", backgroundColor: "green" }
                          : {}
                      }
                      className="w-full py-3"
                      to="location"
                    >
                      <button className="text-white w-full py-3 px-5 text-sm ">
                        Địa Điểm
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                </ul>
              </div>
            </div>
          </div>
          <div
            id="adminCss"
            className="admin_leftconent col-span-10 mt-16 m-5 w-auto "
          >
            <Outlet />
            <div
              className={
                !active
                  ? "fixed left-0 top-[200px] w-[40%] border-r-gray-900  bg-[orange] ease-in-out duration-500 "
                  : "fixed left-[-100%]"
              }
            >
              <div className=" display_nav laptop:hidden desktop:hidden  flex-col  ">
                <ul>
                  <li>
                    {" "}
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "black", backgroundColor: "green" }
                          : {}
                      }
                      to="user"
                      className="w-full py-3"
                    >
                      <button className="text-white w-full py-3 text-sm ">
                        Người Dùng
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                  <li>
                    {" "}
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "dark", backgroundColor: "green" }
                          : {}
                      }
                      to="rent"
                      className="w-full py-3"
                    >
                      <button className="text-white w-full py-3 px-5 text-sm ">
                        Danh Sách Thuê Phòng
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                  <li>
                    {" "}
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "dark", backgroundColor: "green" }
                          : {}
                      }
                      to="room"
                      className="w-full py-3"
                    >
                      <button className="text-white w-full py-3 px-5 text-sm ">
                        Danh Sách Phòng
                      </button>
                    </NavLink>
                  </li>
                  <hr />
                  <li>
                    <NavLink
                      style={({ isActive }) =>
                        isActive
                          ? { color: "dark", backgroundColor: "green" }
                          : {}
                      }
                      className="w-full py-3"
                      to="location"
                    >
                      <button className="text-white w-full py-3 px-5 text-sm ">
                        Địa Điểm
                      </button>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminTemplate;
