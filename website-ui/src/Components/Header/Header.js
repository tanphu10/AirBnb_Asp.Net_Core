import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import AfterRegister from "./AfterRegister";
import "./Header.scss";
import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import { AlignCenterOutlined, AlignRightOutlined } from "@ant-design/icons";
import { getAllRoomAPI, searchRoomApi } from "../../redux/slices/roomSLices";
const Header = () => {
  // const [open, setOpen] = useState(false);
  const [active, setactive] = useState(false);
  const handleActive = () => {
    setactive(!active);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ----------------------------------------------------
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const collapseButton = () => {
    setExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Nếu click ra ngoài nút button, thu nhỏ nút button
        collapseButton();
      }
    };

    const handleScroll = () => {
      // Nếu scroll, thu nhỏ nút button
      collapseButton();
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ---------xử lí nhấn nút enter là tìm kiếm được
  const [inputValue, setInputValue] = useState("");

  // Hàm xử lý khi nhấn Enter hoặc click vào button
  const handleAction = () => {
    // Thực hiện các xử lý bạn muốn với giá trị từ ô input (inputValue)
    // console.log("Input value:", inputValue);
    dispatch(searchRoomApi(inputValue));
    navigate("/");
  };
  // Hàm xử lý khi nhấn Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAction();
    }
  };
  return (
    <div className="header">
      <div className="container-lg ">
        <div className="bg-white drop-shadow-md fixed w-full z-999">
          <nav className="drop-shadow border-gray-200 ">
            <div className="header_content max-w-screen-xl flex items-center justify-between  p-4 sm:flex tablet:justify-end ">
              <NavLink
                className="logo flex items-center sm:text-sm "
                onClick={() => {
                  dispatch(getAllRoomAPI());
                }}
                to={"/"}
              >
                <i
                  className="fa-brands fa-airbnb sm:text-sm"
                  style={{ color: "#ff5a1f", fontSize: "40px" }}
                />

                <span className="hidden tablet:flex self-center font-bold text-orange-500 text-3xl whitespace-nowrap ml-3 sm:text-sm">
                  airbnb
                </span>
              </NavLink>
              <div
                className="flex laptop:justify-between tablet:justify-end items-center max-w-[1240px] mx-auto px-3 rounded-2xl "
                id="navbar-user"
              >
                <div
                  ref={buttonRef}
                  className={`expandable-button ${expanded ? "expanded" : ""}`}
                  onClick={toggleExpand}
                >
                  <ul className="hidden mobile:flex tablet:flex  ">
                    <li className="btn_header">
                      <a
                        href="#"
                        className="btn_header_navbar block py-2 pl-3 pr-4 text-black rounded md:p-0 hover:text-white duration-200"
                        aria-current="page"
                      >
                        Địa chỉ bất kỳ
                      </a>
                    </li>
                    <li className="btn_header ml-5">
                      <a
                        href="#"
                        className="btn_header_navbar block py-2 pl-3 pr-4 text-black rounded md:p-0 hover:text-white duration-200"
                      >
                        tìm kiếm tên phòng
                      </a>
                    </li>
                    <li className="flex items-center ml-5">
                      <a
                        href="#"
                        className="block py-2 pl-3 pr-4 text-black rounded  md:p-0 hover:text-white duration-200"
                      >
                        Tìm kiếm địa điểm
                      </a>
                    </li>
                  </ul>
                  {expanded && (
                    <div
                      className="expanded-content rounded-l-md	text-center w-100  "
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        type="text"
                        className="search-input rounded-l-md	"
                        placeholder="Nhập từ khóa..."
                        id="searchRoom"
                        onClick={(event) => event.stopPropagation()}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button
                        className="inner-button py-2 px-4 bg-green-600 rounded-r-md "
                        onClick={handleAction}
                      >
                        {/* tìm kiếm */}
                        <i className="fa-solid fa-magnifying-glass text-white ml-4"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div onClick={handleActive} className="block tablet:hidden">
                  {!active ? <AlignCenterOutlined /> : <AlignRightOutlined />}
                </div>
                <div
                  className={
                    active
                      ? "fixed left-0 top-[200px] w-[50%] border-r-gray-900  bg-[orange] ease-in-out duration-500 "
                      : "fixed left-[-100%]"
                  }
                >
                  <ul className="tablet:hidden mobile:hidden uppercase">
                    <li className="p-4 border-b text-white border-gray-600">
                      Địa chỉ bất kỳ
                    </li>
                    <li className="p-4 border-b text-white border-gray-600">
                      Thêm khách hàng
                    </li>
                    <li className="p-4 text-white ">Tuần bất kỳ</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center">
                <AfterRegister />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
