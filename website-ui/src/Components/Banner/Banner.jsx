import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { BiHomeHeart } from "react-icons/bi";
import "./Banner.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiTypeRoom,
  getApiTypeRoomId,
} from "../../redux/slices/roomSLices";
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
        {arrTypeRoom?.map(({ id, typeName, icons }, index) => {
          // console.log(icons);
          return (
            <button
              className="swiper-slide"
              key={index}
              onClick={() => {
                dispatch(getApiTypeRoomId(id));
              }}
            >
              <img className="icons" src={icons} alt="" />
              <span className="title">{typeName}</span>
            </button>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
