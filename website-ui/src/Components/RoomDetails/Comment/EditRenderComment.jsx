import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { editCommentApi } from "../../../redux/slices/commentUserSlice";
import { message } from "antd";
import { getUser } from "../../../shared/function/token-storage";
import { Comment } from "../../../_model/Comment";

const EditRenderComment = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id, noiDung, setDataUpdated } = props;
  const { arrSetComment } = useSelector((state) => state.commentUser);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  let giaTri = arrSetComment.id == id;
  useEffect(() => {
    setContent(giaTri ? arrSetComment : "");
  }, [arrSetComment]);
  if (giaTri) {
    return (
      <div className="flex flex-row" style={{ width: "100%" }}>
        {contextHolder}
        <div className="relative z-0 w-full group mx-4">
          <input
            type="text"
            id="editValue"
            value={content.content}
            onChange={(event) => setContent(event.target.value)}
            className="block py-0 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ...
          </label>
        </div>
        <button
          className="hover:text-red-600"
          type="button"
          onClick={() => {
            if (!getUser()) {
              return document.getElementById("SignIn").click();
            } else {
              if (document.getElementById("editValue").value) {
                const binhLuan = new Comment();
                binhLuan.roomId = arrSetComment.roomId;
                binhLuan.dateCreated = new Date();
                binhLuan.content = content;
                binhLuan.id = arrSetComment.id;
                if (binhLuan) {
                  dispatch(editCommentApi(binhLuan));
                  messageApi.success("updatethành công");
                  setDataUpdated(true);
                }
              }
            }
          }}
        >
          <SendOutlined />
        </button>
      </div>
    );
  } else {
    return <span>{noiDung}</span>;
  }
};

export default EditRenderComment;
