import React, { Fragment, useEffect } from "react";
import "./ProductRoom.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomAPI } from "../../redux/slices/roomSLices";
import { AiTwotoneStar, AiFillHeart } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { DOMAIN_BE_IMG } from "../../util/constants";
import {
  getAllCommentApi,
} from "../../redux/slices/commentUserSlice";
const ProductRoom = () => {
  const dispatch = useDispatch();
  const { arrayRoom } = useSelector((state) => state.room);
  const { arrCommentMaPhong } = useSelector((state) => state.commentUser);

  // const getRate = (id) => {
  //   let arr = [];
  //   arrCommentMaPhong.find((item) => {
  //     if (id == item.room_id) {
  //       arr.push(item);
  //     }
  //   });
  //   if (arr) {
  //     let totalRate = arr?.reduce((total, item, index) => {
  //       return (total += item.rate);
  //     }, 0);
  //     return (totalRate / arr.length).toFixed(1);
  //   }
  // };
  useEffect(() => {
    // dispatch(set_loading_started());
    // dispatch(set_loading_end());
    if (!arrayRoom.length > 0) {
      dispatch(getAllRoomAPI());
    }
    if (!arrCommentMaPhong.length > 0) {
      dispatch(getAllCommentApi());
    }
  }, []);
  return (
    <Fragment>
      <div className="grid laptop:grid-cols-2 p-5 gap-11 " id="Product">
        {arrayRoom.length > 0 ? (
          arrayRoom?.map(({ name, price, photo, id }, index) => {
            return (
              <div className="product_item" key={index}>
                <div className="image_item ">
                  <img
                    width={"500px"}
                    height={"350px"}
                    src={DOMAIN_BE_IMG + photo}
                    alt=""
                  />
                </div>
                <AiFillHeart className="heart text-xl hover:text-orange-500 " />
                <div className="sub_title">
                  <div className="name_price laptop:flex mt-2 ml-2">
                    <h3 className="">
                      <span className="font-bold mobile:text-[14px] text-[16px]">
                        Tên phòng :
                      </span>{" "}
                      {name}
                    </h3>

                    <p className="flex items-center mr-3 ">
                      <AiTwotoneStar className="icon mr-1 duration-500 cursor-pointer" />{" "}
                      {/* {getRate(id)} */}
                      5*
                    </p>
                  </div>
                  <div className="ml-2 mt-2 laptop:flex items-center justify-between">
                    <p className="desktop:mb-0 laptop:mb-0 mb-5">
                      <span className="font-bold  ">Giá phòng: </span> ${price}
                      /đêm
                    </p>

                    <NavLink
                      to={`/detail/${id}`}
                      className="btnChiTiet py-2 px-4 border  duration-500 mr-3 "
                    >
                      Xem chi tiết
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center">
            <h2 className="text-center font-medium text-orange-500">
              không tìm thấy data
            </h2>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductRoom;
