import React, { useEffect, useState } from "react";
import { Table, Tag, Input, Popconfirm, Button } from "antd";
import { adminUser } from "../../services/adminUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllRent } from "../../redux/slices/adminUserSlices";
import { useNavigate } from "react-router-dom";
import DisplayModelRoom from "./DisplayModelRoom";

const AdminRent = () => {
  const columns = [
    {
      title: "stt",
      dataIndex: "key",
      key: "key",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mã Phòng",
      dataIndex: "room_id",
      key: "room_id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Ngày Đến",
      dataIndex: "date_on",
      key: "date_on",
      render: (text, record, index) => (
        <>
          <Tag color="green" key={index}>
            <p>{text}</p>
          </Tag>
        </>
      ),
    },
    {
      title: "Ngày Đi",
      dataIndex: "date_out",
      key: "date_out",
      render: (text, record, index) => (
        <>
          <Tag color="red" key={index}>
            <p>{text}</p>
          </Tag>
        </>
      ),
    },
    {
      title: "Số khách",
      dataIndex: "number_guest",
      key: "soLuongKhach",
    },
    {
      title: "Mã Người Dùng",
      key: "user_id",
      dataIndex: "user_id",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <>
          <Popconfirm
            title={`Xác nhận xóa id:${record.id}`}
            okText="Đồng ý"
            cancelText="Hủy"
            okType
            onConfirm={() => {
              console.log("record", record);
              btnXoa(record.id);
            }}
          >
            <button className="text-white bg-red-500 mr-2 py-2 px-3 rounded-lg hover:bg-red-600 duration-500 ">
              Xóa
            </button>
          </Popconfirm>
          <button
            onClick={() => {
              document.getElementById("BookRoomId").click();
              btnSua(record);
            }}
            className="text-white bg-yellow-300 py-2 px-3 rounded-lg hover:bg-yellow-400 duration-500 "
          >
            Sửa
          </button>
        </>
      ),
    },
  ];
  const [timKiem, setTimKiem] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rent = useSelector((state) => {
    return state.adminUser.roomrent;
  });
  const btnXoa = (data) => {
    // console.log(data);
    adminUser
      .adminDeleteRentId(data)
      .then((res) => {
        // console.log(res);
        alert(`Xóa thành công user id:${data}`);
        dispatch(getAllRent());
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const btnSua = (data) => {
    // console.log(data);
    navigate(`/admin/rent/${data.id}`);
  };
  useEffect(() => {
    if (!rent.length > 0) {
      dispatch(getAllRent());
    }
  }, []);
  // console.log(rent);
  let newRent = rent?.map((item, index) => {
    return { ...item, key: index + 1 };
  });
  // console.log("newRent", newRent);
  const { Search } = Input;

  const onSearch = (value) => {
    let keyword = newRent.filter((item) => {
      let numberString = item.id.toString();
      let valueString = value.toString();
      if (numberString.includes(valueString)) {
        return { ...item };
      }
    });
    setTimKiem(keyword);
  };
  return (
    <div className="content_room flex justify-between">
      <div className="table_room">
        <div className="flex justify-between">
          <Search
            placeholder="tìm kiếm theo ID"
            allowClear
            bordered
            onChange={(event) => {
              onSearch(event.target.value);
            }}
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
            className="w-1/2 bg-blue-400 my-3"
          />
          <DisplayModelRoom />
        </div>

        <Table
          columns={columns}
          dataSource={timKiem == "" ? newRent : timKiem}
        />
      </div>
    </div>
  );
};

export default AdminRent;
