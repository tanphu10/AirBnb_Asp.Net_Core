import { Modal } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../RoomDetails/RoomDetails.scss";
import FormAdminLocation from "../FormAdminLocation/FormAdminLocation";
const DisplayModelLocation = () => {
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
        id="AddRoomId"
        onClick={showModal}
        className="px-4 py-2 animated-button1 bg-white shadow-sm border rounded-md hover:bg-slate-50 hover:text-orange-500 transition duration-700"
      >
        Đặt Phòng
      </NavLink>
      <Modal
        title="Thêm Phòng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAdminLocation />
      </Modal>
    </div>
  );
};

export default DisplayModelLocation;
