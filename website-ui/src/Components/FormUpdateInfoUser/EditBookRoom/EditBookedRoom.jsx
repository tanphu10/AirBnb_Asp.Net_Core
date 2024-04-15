import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomSLices, {
  findCashRoom,
  findRoomBooker,
  getAllRoomAPI,
  getRoomUserBookedApi,
  putBookedRoomApi,
} from "../../../redux/slices/roomSLices";
import { Modal, message } from "antd";
import { NavLink } from "react-router-dom";
import { layDuLieuLocal } from "../../../util/localStorage";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { InfoBooking } from "../../../_model/InfoBooking";
import "../FormUpdate.scss";

const { RangePicker } = DatePicker;

const EditBookedRoom = (props) => {
  const dispatch = useDispatch();
  const { id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="">
        <NavLink onClick={showModal} className="">
          <button
            onClick={() => {
              dispatch(findRoomBooker(id));
            }}
            className="py-2 px-10  hover:text-white rounded-sm hover:bg-orange-600 duration-500"
          >
            Edit
          </button>
        </NavLink>
      </div>
      <Modal
        title="Chỉnh sửa phòng đã đặt"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <UpdateInfoBooked />
      </Modal>
    </div>
  );
};

export default EditBookedRoom;

const UpdateInfoBooked = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const nguoiDung = layDuLieuLocal("user");

  const { editRoom, pickCashRenderEdit } = useSelector((state) => state.room);
  // console.log("editRoom", editRoom);
  // console.log(pickCashRenderEdit);
  const [date, setDate] = useState([]);
  const date1 = dayjs(date[0]);
  const date2 = dayjs(date[1]);
  const totalDate = date2.diff(date1, "day", true);

  const [content, setContent] = useState("");
  let giaTri = editRoom.find((item) => {
    return item;
  });
  // console.log(giaTri);
  useEffect(() => {
    setContent(giaTri ? giaTri : "");
  }, [editRoom]);
  useEffect(() => {
    if (giaTri) {
      async function fetchData() {
        await dispatch(getAllRoomAPI());
        await dispatch(findCashRoom(giaTri.room_id));
      }
      fetchData();
    }
  }, []);
  if (giaTri) {
    return (
      <div id="EditBookedRoom">
        {contextHolder}
        <div className="relative z-0 w-full my-5 group bg-slate-400">
          <input
            type="text"
            id="editId"
            value={content.id}
            onChange={(event) => setContent(event.target.value)}
            readOnly={true}
            className="block   px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-orange-500 appearance-none dark:text-white dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-orange-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
        <div className="relative z-0 w-full my-5 group  bg-slate-400">
          <input
            type="text"
            id="editMaNguoiDung"
            value={content.user_id}
            onChange={(event) => setContent(event.target.value)}
            readOnly={true}
            className="block   px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-orange-500 appearance-none dark:text-white dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-orange-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mã Người Dùng
          </label>
        </div>
        <div className="relative z-0 w-full my-5 group">
          <input
            type="text"
            id="editMaPhong"
            value={content.room_id}
            onChange={(event) => setContent(event.target.value)}
            // readOnly={true}
            className="block   px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-orange-500 appearance-none dark:text-white dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-orange-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mã Phòng
          </label>
        </div>
        <div className="relative z-0 w-full my-5 group">
          <input
            type="text"
            id="editSoLuongKhach"
            value={content.number_guest}
            onChange={(event) => setContent(event.target.value)}
            className="block   px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-orange-500 appearance-none dark:text-white dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-orange-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Số Lượng khách
          </label>
        </div>
        <div className="mt-5">
          <RangePicker
            id="ngayThang"
            style={{
              width: "100%",
              border: "1px solid orange",
              padding: "7px",
            }}
            onChange={(acb) => {
              setDate(acb)?.map((item) => {
                return dayjs(item).format("DD/MM/YYYY");
              });
            }}
          />
        </div>
        <div className="footer_card mt-5 text-center flex items-center justify-between gap-3">
          <button
            type="submit"
            className="btnDatPhong  w-full py-2 px-4 mt-3 rounded-lg  text-lg font-semibold "
            onClick={async () => {
              const infoBooking = new InfoBooking();
              infoBooking.id = +document.getElementById("editId").value;
              infoBooking.room_id =
                +document.getElementById("editMaPhong").value;
              infoBooking.user_id =
                +document.getElementById("editMaNguoiDung").value;
              infoBooking.number_guest =
                +document.getElementById("editSoLuongKhach").value;
              infoBooking.date_on = date1;
              infoBooking.date_out = date2;
              // console.log(infoBooking);
              await dispatch(putBookedRoomApi(infoBooking));
              // await dispatch(getRoomUserBookedApi(infoBooking.user_id));
            }}
            onClose={props.onClose}
          >
            Update Đặt Phòng
          </button>
        </div>
        <div className="text-center my-2">
          <span className="text-gray-400 text-center">
            Bạn vẫn chưa bị trừ tiền
          </span>
        </div>
        <hr />
        {pickCashRenderEdit.map((item, index) => {
          console.log(item);
          return (
            <div className="my-5" key={index}>
              <div className="flex">
                <div
                  className="w-1/2 text-gray-500 text-lg"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  <span>{item.price}$</span>
                  <span>x{totalDate} Đêm</span>
                </div>
                <div className="w-1/2 text-right text-red-700  text-lg">
                  {item.price * totalDate} $
                </div>
              </div>
              <div className="flex my-2">
                <div
                  className="w-1/2 text-gray-500 text-lg"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  <span>Phí dịch vụ</span>
                </div>
                <div className="w-1/2 text-right text-red-700  text-lg">
                  0 $
                </div>
              </div>
              <hr />
              <div className="flex my-2">
                <div
                  className="w-1/2 text-gray-500 text-lg"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  <span>Tổng Cộng </span>
                </div>
                <div className="w-1/2 text-right text-red-700 font-bold text-lg">
                  {item.price * totalDate} $
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
