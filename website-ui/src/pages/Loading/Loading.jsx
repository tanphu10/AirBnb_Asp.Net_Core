import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "./../../assets/animation/animation_loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="h-screen w-full flex items-center opacity-70  fixed bg-white"
      style={{ zIndex: 9999 }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
