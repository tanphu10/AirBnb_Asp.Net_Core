import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { BiHomeHeart } from "react-icons/bi";
import "./Banner.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiTypeRoom,
  getApiTypeRoomId,
} from "../../redux/slices/roomSLices";
import { DOMAIN_BE_IMG } from "../../util/constants";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 5 },
  { width: 1200, itemsToShow: 5 },
];

const Banner = () => {
  const dispatch = useDispatch();
  const { arrTypeRoom } = useSelector((state) => state.room);
  useEffect(() => {
    if (!arrTypeRoom.length > 0) {
      dispatch(getApiTypeRoom());
    }
  });

  return (
    <div id="banner">
      <Carousel breakPoints={breakPoints}>
        {arrTypeRoom?.map(({ id, typeName, image }, index) => {
          // console.log(icons);
          return (
            <button
              className="swiper-slide"
              key={index}
              onClick={() => {
                dispatch(getApiTypeRoomId(id));
              }}
            >
              <div>
                <img
                  className="icons"
                  src={DOMAIN_BE_IMG + image}
                  alt=""
                />
              </div>

              <span className="title">{typeName}</span>
            </button>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
