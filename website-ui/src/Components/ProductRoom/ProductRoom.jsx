import React, { Fragment, useEffect, useState } from "react";
import "./ProductRoom.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomAPI, searchRoomApi } from "../../redux/slices/roomSLices";
import { AiTwotoneStar, AiFillHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { DOMAIN_BE_IMG } from "../../util/constants";
import { getAllCommentApi } from "../../redux/slices/commentUserSlice";
import { Pagination } from "antd";
import { Paging } from "../../_model/Paging";
import { getUser } from "../../shared/function/token-storage";

const ProductRoom = () => {
  const dispatch = useDispatch();
  const { arrayRoom } = useSelector((state) => state.room);
  const { arrCommentMaPhong } = useSelector((state) => state.commentUser);
  const { LikeRoom } = useSelector((state) => state.rate);
  // console.log("arrayRoom", arrayRoom);
  const Like = LikeRoom.results?.find((t) => t.userId === getUser().id);
  const [value, setValue] = useState({ pageSize: 10, pageIndex: 1 });
  const onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    setValue({ pageIndex: current, pageSize: pageSize });
  };
  useEffect(() => {
    if (!arrayRoom.length > 0) {
      dispatch(getAllRoomAPI());
    }
    if (!arrCommentMaPhong.length > 0) {
      dispatch(getAllCommentApi());
    }
    if (value != null) {
      const data = new Paging();
      data.pageIndex = value.pageIndex;
      data.pageSize = value.pageSize;
      dispatch(searchRoomApi(value));
    }
  }, [value]);
  return (
    <Fragment>
      <div className="grid laptop:grid-cols-2 p-5 gap-11" id="Product">
        {arrayRoom.length > 0 ? (
          arrayRoom?.map(({ name, price, photo, id }, index) => {
            return (
              <div className="product_item " key={index}>
                <div className="image_item ">
                  <img
                    width={"500px"}
                    height={"350px"}
                    src={DOMAIN_BE_IMG + photo}
                    alt=""
                  />
                </div>
                <AiFillHeart
                  style={{ color: Like ? "red" : "black" }}
                  className="heart text-4xl cursor-pointer"
                />
                <div className="sub_title">
                  <div className="name_price laptop:flex mt-2 ml-2">
                    <h3 className="">
                      <span className="font-bold mobile:text-[14px] text-[16px]">
                        Tên phòng :
                      </span>{" "}
                      {name}
                    </h3>
                    <p className="flex items-center mr-3 ">
                      {" "}
                      5
                      <AiTwotoneStar className="icon mr-1 duration-500 cursor-pointer" />{" "}
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
              không tìm thấy phòng
            </h2>
          </div>
        )}
      </div>
      <Pagination
        className="mb-24"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        total={arrayRoom.length}
      />
    </Fragment>
  );
};

export default ProductRoom;
