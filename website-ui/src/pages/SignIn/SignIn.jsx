import React, { useState } from "react";
import FormSignIn from "../../Components/FormSignIn/FormSignIn";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { Modal } from "antd";
const SignIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div id="SignIn">
      <NavLink
        onClick={showModal}
        className="text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        Đăng Nhập
      </NavLink>
      <Modal title="Đăng Nhập" open={isModalOpen} onCancel={handleCancel}>
        <FormSignIn handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default SignIn;
