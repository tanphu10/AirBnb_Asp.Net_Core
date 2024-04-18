import React, { useState } from "react";
import { DatePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PostBookRoomApi } from "../../redux/slices/bookingRoomSlice";
import { InfoBooking } from "../../_model/InfoBooking";
import dayjs from "dayjs";
import { getUser } from "../../shared/function/token-storage";

const { RangePicker } = DatePicker;

const PickCanlender = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const user = getUser();
  const navigate = useNavigate();

  const [date, setDate] = useState([]);
  // console.log("date", date);
  const date1 = dayjs(date[0]);
  const date2 = dayjs(date[1]);
  const totalDate = date2.diff(date1, "day", true);
  // console.log(date1);
  // console.log(totalDate);
  return (
    // <form onSubmit={handleSubmit}>
    <div>
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
      <div className="relative z-0 w-full my-5 group">
        <h3 className="text-orange-600">
          phòng có tối đa : {""}
          <span className="text-neutral-700 ">{props.guest} khách</span>
        </h3>
      </div>
      <div className="relative z-0 w-full my-5 group">
        {/* <h3>phòn</h3> */}
        <input
          type="number"
          id="guestNumber"
          // onChange={handleChange}
          // onBlur={handleBlur}
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
      <div className="relative z-0 w-full my-5 group">
        <input
          type="text"
          id="noteBook"
          className="block   px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-orange-500 appearance-none dark:text-white dark:border-orange-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-orange-600 dark:text-orange-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
         ghi chú
        </label>
      </div>
      <div className="footer_card mt-5 text-center flex items-center justify-between gap-3">
        <button
          type="submit"
          className="btnDatPhong  w-full py-2 px-4 mt-3 rounded-lg  text-lg font-semibold "
          onClick={() => {
            if (!user) {
              return document.getElementById("SignIn").click();
            } else {
              const infoBooking = new InfoBooking();
              infoBooking.roomId = params.id;
              infoBooking.guestNumber = Number(
                document.getElementById("guestNumber").value
              );
              infoBooking.dateCheckIn = date[0];
              infoBooking.dateCheckout = date[1];
              infoBooking.note=  document.getElementById("noteBook").value
              console.log("infoBooking", infoBooking);
              dispatch(PostBookRoomApi(infoBooking));
              navigate("/pay-room")
            }
          }}
        >
          Đặt Phòng
        </button>
      </div>
      <div className="text-center my-2">
        <span className="text-gray-400 text-center">
          Bạn vẫn chưa bị trừ tiền
        </span>
      </div>
      <hr />
      <div className="my-5">
        <div className="flex">
          <div
            className="w-1/2 text-gray-500 text-lg"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <span>{props.giaTien}$</span>
            <span>x{totalDate} Đêm</span>
          </div>
          <div className="w-1/2 text-right text-red-700  text-lg">
            {props.giaTien * totalDate} $
          </div>
        </div>
        <div className="flex my-2">
          <div
            className="w-1/2 text-gray-500 text-lg"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <span>Phí dịch vụ</span>
          </div>
          <div className="w-1/2 text-right text-red-700  text-lg">0 $</div>
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
            {props.giaTien * totalDate} $
          </div>
        </div>
      </div>
    </div>
    // </form>
  );
};

export default PickCanlender;
