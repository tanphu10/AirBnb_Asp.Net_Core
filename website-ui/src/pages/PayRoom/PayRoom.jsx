import { useNavigate, useParams } from "react-router-dom";
import "./payroom.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBookRoomId,
  PayCashToOwner,
} from "../../redux/slices/bookingRoomSlice";
import { getDetailRoomAPI } from "../../redux/slices/roomSLices";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { PayRoomToOwner } from "../../_model/PayRoomToOwner";

const PayRoom = () => {
  const dispatch = useDispatch();
  const { BookRoomId } = useSelector((state) => state.booking);
  const { room } = useSelector((state) => state.room);
  const navigate = useNavigate();
  // console.log(room);
  const { photo, authorUserId } = room;
  const {
    id,
    authorName,
    roomId,
    roomName,
    dateCheckIn,
    dateCheckout,
    guestNumber,
    imageRoom,
    payRoomAmount,
    status,
    isPaid,
    note,
  } = BookRoomId;
  // console.log(imageRoom)
  var params = useParams();
  useEffect(() => {
    dispatch(GetBookRoomId(params.id));
    if (roomId != null) {
      dispatch(getDetailRoomAPI(roomId));
    }
  }, []);
  return (
    <div id="payRoom" className=" h-28 ">
      <div className=" flex mt-24 container px-10 mx-auto  pb-20">
        <div className="max-w-[1240px] mx-3 grid md:grid-cols-2">
          <div className="max-w-4xl bg-white border border-gray-200 laptop:rounded-lg tablet:rounded-t-lg shadow mobile:rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="laptop:shrink-0  ">
              <a href="#" style={{ width: "100%" }}>
                <img
                  className="
                              laptop:rounded-s-lg 
                              tablet:rounded-lg
                              mobile: rounded-md
                              laptop:w-full"
                  style={{ width: "100%" }}
                  src={DOMAIN_BE_IMG + photo}
                />
              </a>
              <div className="p-5">
                <div>
                  <h5 className="mb-3 text-gray-700 dark:text-gray-400 font-normal text-sm">
                    <span className="font-semibold text-black">
                      Tên Phòng:{" "}
                    </span>
                    {roomName}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div
            id="payroom"
            className=" description_payroom desktop:w-[500px] desktop:ml-[100px] laptop:w-[500px] laptop:ml-[100px] tablet:w-[250px] tablet:ml-[50px] 
          "
          >
            <div className="animated-button1 bg-white shadow-xl border rounded-xl p-6 w-full lg:w-5/6 mx-auto">
              <div className="relative w-full">
                <div className="flex justify-center">
                  <div className=" text-gray-500 text-lg">
                    Thông Tin Thanh Toán
                  </div>
                </div>
                <div className="header_card border-b pb-5 text-2xl font-semibold flex items-center justify-between">
                  {/* <h3 className="text-lg"></h3> */}
                </div>
                <div className="flex">
                  <div className="w-1/2 text-gray-500 text-lg">Tên Phòng :</div>
                  <div className=" text-right text-red-700  text-lg">
                    {roomName}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 text-gray-500 text-lg">Tên User :</div>
                  <div className=" text-right text-red-700  text-lg">
                    {authorName}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 text-gray-500 text-lg">
                    Số lượng khách :
                  </div>
                  <div className=" text-right text-red-700  text-lg">
                    {guestNumber}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 text-gray-500 text-lg">
                    ngày check in :
                  </div>
                  <div className=" text-right text-red-700  text-lg">
                    {dateCheckIn}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 text-gray-500 text-lg">
                    ngày check out
                  </div>
                  <div className=" text-right text-red-700  text-lg">
                    {dateCheckout}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 text-gray-500 text-lg">Ghi chú:</div>
                  <div className=" text-right text-red-700  text-lg">
                    {note}
                  </div>
                </div>
                <hr />
                <div className="my-5">
                  <div className="flex">
                    <div className="w-1/2 text-gray-500 text-lg">
                      Giá phòng:
                    </div>
                    <div className="w-1/2 text-right text-red-700  text-lg">
                      <span>{room.price}$</span> /Đêm
                    </div>
                  </div>
                  <div className="flex my-2">
                    <div className="w-1/2 text-gray-500 text-lg">
                      <span>Phí dịch vụ</span>
                    </div>
                    <div className="w-1/2 text-right text-red-700  text-lg">
                      0 $
                    </div>
                  </div>
                  <hr />
                  <div className="flex my-2">
                    <div className="w-1/2 text-gray-500 text-lg">
                      <span>Tổng Cộng </span>
                    </div>
                    <div className="w-1/2 text-right text-red-700 font-bold text-lg">
                      {payRoomAmount} $
                    </div>
                  </div>
                </div>
                <div className="footer_card mt-5 text-center flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="btnThanhToan  w-full py-2 px-4 mt-3 rounded-lg  text-lg font-semibold "
                    onClick={() => {
                      const pay = new PayRoomToOwner();
                      pay.ownerId = authorUserId;
                      pay.bookId = id;
                      dispatch(PayCashToOwner(pay));
                      navigate("/");
                    }}
                  >
                    Thanh Toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRoom;
