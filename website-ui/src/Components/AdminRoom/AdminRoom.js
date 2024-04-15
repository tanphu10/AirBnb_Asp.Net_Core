import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Popconfirm } from "antd";
import FormAddRoom from "../FormAddRoom/FormAddRoom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomAPI } from "../../redux/slices/roomSLices";
import { getAllLocation } from "../../redux/slices/adminUserSlices";
import { adminUser } from "../../services/adminUser";
import { useNavigate } from "react-router-dom";
import { DOMAIN_BE_IMG } from "../../util/constants";
const AdminRoom = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Tên phòng",
      dataIndex: "name_room",
      key: "name_room",
      render: (text, record, index) => {
        return (
          <div>
            {!record.tenViTri ? (
              <>
                {" "}
                <p>{}</p>
                <p>{text}</p>
                <img
                  src={DOMAIN_BE_IMG + record.photo}
                  width={"320px"}
                  alt=""
                />
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      title: "Giá Tiền",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => {
        return <div>{!record.tenViTri ? <p>{text}$/Đêm</p> : <></>}</div>;
      },
    },
    {
      title: "Mô Tả",
      render: (text, record, index) => {
        return (
          <div className="w-60">
            <p className=" line-clamp-2 w-full whitespace-pre-line hover:block ">
              {record.descr}
            </p>
          </div>
        );
      },
    },
    {
      title: "Chi tiết",
      render: (text, record, index) => {
        return (
          <>
            {" "}
            {!record.tenViTri ? (
              <div>
                <p>
                  Vị trí :
                  {vitri.map((item) => {
                    if (item.id == record.locate_id) {
                      return `${item.name_locate},${item.province},${item.nation}`;
                    }
                  })}
                </p>
                <p>Số Khách : {record.number_guest}</p>
                <p>
                  Phòng ngủ : {record.bedroom} | Giường: {record.giuong}
                </p>
                <p>
                  Phòng tắm : {record.bathroom} | Máy Giặt:
                  {record.wash_machine ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}
                </p>
                <p>
                  Bàn Là :{" "}
                  {record.iron_cloth ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}{" "}
                  | TiVi:
                  {record.television ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}
                </p>
                <p>
                  Điều Hòa :{" "}
                  {record.air_conditioner ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}{" "}
                  | Wifi:
                  {record.wifi ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}
                </p>
                <p>
                  Bếp :{" "}
                  {record.kitchen ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}{" "}
                  | Đỗ Xe:
                  {record.park ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}
                </p>
                <p>
                  Hồ Bơi :{" "}
                  {record.pool ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}{" "}
                  | Bàn Ủi:
                  {record.iron_cloth ? (
                    <Tag color="green">
                      <p>Có</p>
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <p>Không có</p>
                    </Tag>
                  )}
                </p>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <>
          {!record.tenViTri ? (
            <div>
              <Popconfirm
                title={`Xác nhận xóa id:${record.id}`}
                okText="Đồng ý"
                cancelText="Hủy"
                okType
                onConfirm={() => {
                  btnXoa(record.id);
                }}
              >
                <button className="text-white bg-red-500 mr-2 py-2 px-3 rounded-lg hover:bg-red-600 duration-500 ">
                  Xóa
                </button>
              </Popconfirm>

              <button
                onClick={() => {
                  // console.log(record)
                  btnSua(record);
                }}
                className="text-white bg-yellow-300 py-2 px-3 rounded-lg hover:bg-yellow-400 duration-500 "
              >
                Sửa
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];
  // console.log("columns_room", columns);
  const navigate = useNavigate();

  const vitri = useSelector((state) => {
    return state.adminUser.vitri;
  });
  // console.log("vitri,vitri", vitri);
  const btnXoa = (data) => {
    // console.log(data);
    adminUser
      .deleteRoomId(data)
      .then((res) => {
        alert(`Xóa thành công room id:${data}`);
        dispatch(getAllRoomAPI());
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const btnSua = (data) => {
    // console.log(data);
    navigate(`/admin/room/${data.id}`);
  };

  const dispatch = useDispatch();
  const arrRoom = useSelector((state) => {
    return state.room.arrayRoom;
  });

  useEffect(() => {
    if (!arrRoom.length > 0) {
      dispatch(getAllRoomAPI());
    }
    if (!vitri.length > 0) {
      dispatch(getAllLocation());
    }
  }, []);
  return (
    <div className="content_room">
      <FormAddRoom />
      <Table columns={columns} dataSource={arrRoom} />
    </div>
  );
};

export default AdminRoom;
