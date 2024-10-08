import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, Popconfirm, Space, message } from "antd";
import {
  getAllRoomAPI,
  getRoomUserBookedApi,
} from "../../redux/slices/roomSLices";
import { roomServ } from "./../../shared/services/roomServices";
import FormUpdateUser from "../../Components/FormUpdateInfoUser/FormUpdateUser/FormUpdateUser";
import EditBookedRoom from "../../Components/FormUpdateInfoUser/EditBookRoom/EditBookedRoom";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { editAvatarApi } from "../../redux/slices/userSlice";
import { getUser } from "../../shared/function/token-storage";
import { bookRoomService } from "../../shared/services/bookRoomService";
import "./info.scss";
const InfoUser = () => {
  const userId = getUser().id;
  // console.log("mã người dùng",userId)
  const [data, setData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoomAPI());
    dispatch(getRoomUserBookedApi(userId));
  }, []);

  const handleHideChose = () => {
    let x = document.getElementById("myImg");
    x.style.display === "none"
      ? (x.style.display = "inline-flex")
      : (x.style.display = "none");
  };
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setData(file);
  };
  const { ObUser } = useSelector((state) => state.user);
  return (
    <Fragment>
      <div className="border-b" style={{ margin: "100px 10px 0 10px" }}>
        <div>
          <h2>
            Welcome to Airbnb ,Hello
            <span className="font-semibold text-red-600 ml-2">
              {ObUser?.full_name}
            </span>
          </h2>
        </div>
        <FormUpdateUser />
      </div>
      <div className="max-w-[1240px] mx-3 grid md:grid-cols-2">
        <DisplayRoomBooked userId={userId} />

        <div
          className="desktop:w-[300px] desktop:ml-[300px] laptop:w-[250px] laptop:ml-[250px] tablet:w-[250px] tablet:ml-[100px] tablet:mb-[116px] mb-[116px] 
         mt-8 "
        >
          <div className="sticky top-36">
            <div className="animated-button1 bg-white shadow-xl border rounded-xl p-6 mx-auto ">
              <div className="relative w-full">
                <div className="header_card border-b  font-semibold flex items-center flex-col mt-3 ">
                  <div style={{ width: "150px", height: "150px" }}>
                    {ObUser?.avatar ? (
                      <img
                        style={{ height: "100%", borderRadius: "60%" }}
                        src={DOMAIN_BE_IMG + ObUser.avatar}
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
                  <button
                    className="hover:underline desktop:text-[16px] laptop:text-[14px] text-[14px]"
                    onClick={handleHideChose}
                  >
                    Thay đổi avatar
                  </button>
                  <div
                    id="myImg"
                    className="flex flex-col justify-center items-center"
                    style={{ display: "none" }}
                  >
                    <input
                      name="file"
                      type="file"
                      // style={{ display: "block" }}
                      // value={data}
                      onChange={handleChangeAvatar}
                    />
                    <button
                      onClick={() => {
                        dispatch(editAvatarApi(data));
                      }}
                      className="my-2 px-3 py-2 rounded-lg bg-slate-400 cursor-pointer hover:underline-offset-2 hover:text-red-700 mb-3 "
                    >
                      Cập Nhập Avatar
                    </button>
                  </div>
                  {/* </form> */}
                </div>
                <p className="text-lg text-black my-3"></p>
                <div className="body_card mt-5 border-b pb-5 ">
                  <p className="font-semibold text-base text-center text-black desktop:text-[16px] laptop:text-[14px] tablet:text-[12px]  ">
                    Chào Mừng bạn đã đến với Airbnb, Cùng nhau khám phá các địa
                    điểm thú vị
                  </p>
                </div>
              </div>
              <div className="my-4 flex  justify-center text-center">
                <NavLink
                  to="/"
                  className="py-2 px-4 border rounded-md duration-500 mr-3 hover:text-orange-500 "
                >
                  Quay về Trang chủ
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InfoUser;

const DisplayRoomBooked = (props) => {
  const { controlRoom } = useSelector((state) => state.room);
  if (controlRoom != null) {
    return (
      <div className="desktop:w-[900px] desktop:mb-[100px] laptop:w-[720px] laptop:mb-[100px] tablet:w-[450px] tablet:mb-[100px]  mx-auto my-4  ">
        {Array.isArray(controlRoom)
          ? controlRoom.map(
              (
                {
                  id,
                  authorUserId,
                  roomId,
                  roomName,
                  dateCheckIn,
                  dateCheckout,
                  guestNumber,
                  imageRoom,
                  payRoomAmount,
                  status,
                  isPaid,
                },
                index
              ) => {
                return (
                  <div key={index}>
                    <div className="max-w-4xl my-4 bg-white border border-gray-200 laptop:rounded-lg tablet:rounded-t-lg shadow mobile:rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
                      <div className="laptop:flex">
                        <div className="laptop:w-3/5 laptop:shrink-0  ">
                          <img
                            className="
                              laptop:rounded-s-lg 
                              tablet:rounded-lg
                              mobile: rounded-md
                              laptop:w-full"
                            style={{ height: "100%" }}
                            src={DOMAIN_BE_IMG + imageRoom}
                          />
                        </div>
                        <div className="laptop:w-2/5">
                          <div className="p-5">
                            <div className="flex justify-between">
                              <div>
                                <h5 className="mb-2 text-xl font-semibold tracking-tight text-black dark:text-white">
                                  Mã Phòng : {roomId}
                                </h5>
                              </div>
                              <div>
                                <FormUpdateBookRoom
                                  id={id}
                                  userId={authorUserId}
                                />
                              </div>
                            </div>
                            <div>
                              <h5 className="mb-3 text-gray-700 dark:text-gray-400 font-normal text-sm">
                                <span className="font-semibold text-black">
                                  Tên Phòng
                                </span>
                                {roomName}
                              </h5>
                            </div>
                            <div className="">
                              {/* <div className="w-1/2"> */}
                              <p className=" text-gray-700 dark:text-gray-400 font-normal text-sm">
                                <span className="text-black  font-semibold">
                                  Check In:
                                </span>
                                <span className="md:text-[16px] sm:text-[14px] text-[14px]">
                                  {/* dayjs('2019-01-25').format('DD/MM/YYYY') */}
                                  {/* {dayjs({ ngayDen }).format("DD/MM/YYYY")} */}
                                  {dateCheckIn}
                                </span>
                              </p>
                              {/* </div> */}
                              {/* <div className="w-1/2"> */}
                              <p className="mb-3 text-gray-700 dark:text-gray-400 font-normal text-sm">
                                <span className="text-black font-semibold">
                                  Check Out :
                                </span>
                                <span className="md:text-[18px] sm:text-[16px] text-[14px]">
                                  {/* {dayjs({ ngayDi }).format("DD/MM/YYYY")} */}
                                  {dateCheckout}
                                </span>
                              </p>
                              {/* </div> */}
                            </div>
                            <div>
                              <h5 className="mb-3 text-gray-700 dark:text-gray-400 font-normal text-sm">
                                <span className="font-semibold text-black">
                                  Số Lượng khách
                                </span>
                                : {guestNumber}
                              </h5>
                            </div>
                            <div className="my-10">
                              {isPaid == false ? (
                                <NavLink
                                  to={`/pay-room/${id}`}
                                  id="button_TT"
                                  className="py-2 px-4 border  duration-500 mr-3 "
                                >
                                  Thanh Toán
                                </NavLink>
                              ) : (
                                // <NavLink
                                //   id="button_NoTT"
                                //   className="py-2 px-4 border duration-500 mr-3 bg-red-600 "
                                // >
                                //   Phòng Đã Thanh Toán
                                // </NavLink>
                                " "
                              )}
                            </div>

                            <div>
                              {status === 1 ? (
                                <NavLink className="py-2 px-10 border rounded-md text-white		 bg-yellow-400 duration-500 mr-3">
                                  Đợi Duyệt
                                </NavLink>
                              ) : status === 2 ? (
                                <NavLink className="py-2 px-16 border  rounded-md text-white		 duration-500 mr-3 bg-red-600 ">
                                  Từ Chối
                                </NavLink>
                              ) : (
                                <NavLink className="py-2 px-16 border  rounded-md text-white		 duration-500 mr-3 bg-emerald-600 ">
                                  Thành Công
                                </NavLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          : ""}
      </div>
    );
  } else {
    return (
      <Fragment>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundImage: `url(/img/image.jpg)`,
            backgroundSize: "cover",
          }}
        >
          Welcome to Airbnb
        </div>
      </Fragment>
    );
  }
};

const FormUpdateBookRoom = (props) => {
  const { id, userId } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const maUser = getUser();
  const cancel = (e) => {
    // console.log(e);
    message.error("Click on No");
  };

  const items = [
    {
      key: "1",
      label: (
        <Popconfirm
          id="DeleteUser"
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => {
            // console.log("xóa đây nè");
            if (maUser.id == userId || maUser.role == "ADMIN") {
              // console.log("xóa trong nữa");
              bookRoomService
                .deleteRoom(id)
                .then((res) => {
                  console.log(res);
                  messageApi.success("Hủy Phòng thành công");
                  dispatch(getRoomUserBookedApi(userId));
                })
                .catch((err) => {
                  // console.log(err);
                  alert("có vấn đề xảy ra");
                });
            } else {
              messageApi.error("Bạn không có quyền xóa ");
            }
          }}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button className="py-2 px-8  hover:text-white rounded-sm hover:bg-orange-600 duration-500">
            Delete
          </button>
        </Popconfirm>
      ),
    },
    {
      key: "2",
      label: <EditBookedRoom id={id} />,
    },
  ];
  return (
    <Space direction="vertical">
      {contextHolder}
      <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <NavLink className="border-none hover:rounded-full">...</NavLink>
      </Dropdown>
    </Space>
  );
};
