import { Modal } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FormAdminUser from "../FormAdminUser/FormAdminUser";

const DisplayModelUser = () => {
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
        id="RegisterUserId"
        onClick={showModal}
        className="px-4 py-2 animated-button1 bg-white shadow-sm border rounded-md hover:bg-slate-50 hover:text-orange-500 transition duration-700"
      >
        Thêm Người Dùng
      </NavLink>
      <Modal
        title="update Người Dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAdminUser />
      </Modal>
    </div>
  );
};

export default DisplayModelUser;
