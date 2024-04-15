import React, { useEffect } from "react";
import { https } from "../../services/config";

const ListRoom = () => {
  useEffect(() => {
    const res1 = https
      .get("/api/phong-thue")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
    // console.log("res1: ", res1);
  }, []);

  return <div>ListRoom</div>;
};

export default ListRoom;
