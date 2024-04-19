import { Drawer, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UpdateItems from "./UpdateItems";
import { useDispatch } from "react-redux";
import { getInfoUserApi } from "../../../redux/slices/userSlice";
import { getUser } from "../../../shared/function/token-storage";

const FormUpdateUser = () => {
  const id = getUser().id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex flex-row justify-between  items-center mr-2">
        <h3 className=" my-2">Phòng Đã Book</h3>
        <NavLink id="update" onClick={showModal} className="">
          <button
            onClick={() => {
              dispatch(getInfoUserApi(id));
            }}
            className="my-2 px-4 py-2 animated-button1 bg-white shadow-sm border rounded-md hover:bg-slate-50 hover:text-orange-500 transition duration-700"
          >
            <i className="fa-solid fa-pen-nib"></i>
            <span className="mx-2"> Chỉnh sửa thông tin </span>
          </button>
        </NavLink>
      </div>
      <Modal
        title="Chỉnh sửa thông tin "
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <UpdateItems setIsModalOpen={setIsModalOpen} />
      </Modal>{" "}
    </div>
  );
};

export default FormUpdateUser;
