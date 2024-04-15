import { Modal } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../RoomDetails/RoomDetails.scss";
import FormAdminRent from "../FormAdminRent/FormAdminRent";
const DisplayModelRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-5">
      <NavLink
        id="BookRoomId"
        onClick={showModal}
        className="px-4 py-2 animated-button1 bg-white shadow-sm border rounded-md hover:bg-slate-50 hover:text-orange-500 transition duration-700"
      >
        Đặt Phòng
      </NavLink>
      <Modal
        title="Đặt Phòng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAdminRent />
      </Modal>
    </div>
  );
};

export default DisplayModelRoom;
