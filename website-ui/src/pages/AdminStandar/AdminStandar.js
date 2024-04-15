import React, { useEffect } from "react";
import { layDuLieuLocal } from "../../util/localStorage";
import Lottie from "react-lottie";
import * as welcome from "./../../assets/animation/welcom.json";
const AdminStandar = () => {
  const admin = layDuLieuLocal("user").content;
  // console.log(admin);
  useEffect(() => {
    if (admin?.user.role != "ADMIN" || admin == null) {
      window.location.href = "https://google.com.vn";
    }
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: welcome,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div className="lottie w-auto min-h-screen">
        <Lottie options={defaultOptions} height={200} width={800} />
      </div>
    </div>
  );
};

export default AdminStandar;
