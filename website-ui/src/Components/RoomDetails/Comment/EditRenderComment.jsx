import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
import { layDuLieuLocal } from "../../../util/localStorage";
import dayjs from "dayjs";
import {
  editCommentApi,
  findRoomUser,
  getAllCommentApi,
  layDataSetComment,
} from "../../../redux/slices/commentUserSlice";
import { message } from "antd";

const EditRenderComment = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  // const params = useParams();
  const { id, noiDung, setComment } = props;
  const { arrSetComment } = useSelector((state) => state.commentUser);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  let giaTri = arrSetComment.find((item) => {
    return id == item.id;
  });
  // console.log(giaTri);
  useEffect(() => {
    setContent(giaTri ? giaTri : "");
    // dispatch(layDataSetComment(id));
  }, [arrSetComment]);
  // console.log(content);
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
            if (!layDuLieuLocal("user")) {
              return document.getElementById("SignIn").click();
            } else {
              if (document.getElementById("editValue").value) {
                // console.log(giaTri);
                const comment = new Comment();
                comment.id = giaTri.id;
                comment.user_id = giaTri.user_id;
                comment.room_id = giaTri.room_id;
                comment.date_comment = new Date();
                comment.content = document.getElementById("editValue").value;
                comment.rate = 0;
                console.log("comment", comment);
                dispatch(editCommentApi(comment));
                setComment(arrSetComment);
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
