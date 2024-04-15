import React from "react";
import * as bgjson from "../../assets/background/bgLoti.json";
import * as notfound from "../../assets/background/NotFound.json";
import Lottie from "react-lottie";
const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bgjson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: notfound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="content relative flex items-center justify-center">
      <div className="z-0 text-xs w-full h-screen">
        <Lottie options={defaultOptions} />
      </div>
      <div className="z-10 absolute">
        <Lottie options={defaultOptions1} />
      </div>
    </div>
  );
};

export default NotFound;
