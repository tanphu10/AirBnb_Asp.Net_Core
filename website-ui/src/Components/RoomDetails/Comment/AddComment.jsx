import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  getAllCommentApi,
  postCommentApi,
  layDataSetComment,
  getCommentRoom,
} from "../../../redux/slices/commentUserSlice";
import { layDuLieuLocal } from "../../../util/localStorage";
import dayjs from "dayjs";
import ".././RoomDetails.scss";
import EditRenderComment from "./EditRenderComment";
import { SendOutlined } from "@ant-design/icons";
import { Dropdown, Popconfirm, Rate, Space, message } from "antd";
import { commentService } from "../../../services/commentService";
import { DOMAIN_BE_IMG } from "../../../util/constants";
import { getInfoUserApi } from "../../../redux/slices/adminUserSlices";

const AddComment = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const maNguoiDung = layDuLieuLocal("user").user?.id;

  const dispatch = useDispatch();
  const { arrComment } = useSelector((state) => state.commentUser);
  // console.log("addComment",arrComment)
  const { getUser } = useSelector((state) => state.adminUser);
  const params = useParams();
  const [comment, setComment] = useState();
  useEffect(() => {
    // async function fetchData() {
    // await dispatch(getAllCommentApi());
    if (!arrComment.length > 0) {
      dispatch(getCommentRoom(params.id));
    }
    // await dispatch(getInfoUserApi(maNguoiDung));
    // }
    // fetchData();
  }, [comment]);
  const sendComment = () => {
    if (!layDuLieuLocal("user")) {
      return document.getElementById("SignIn").click();
    } else {
      if (document.getElementById("noiDung").value) {
        const binhLuan = new Comment();
        // binhLuan.id = 0;
        binhLuan.user_id = layDuLieuLocal("user").content.user?.id;
        binhLuan.room_id = Number(params.id);
        binhLuan.date_comment = new Date();
        // dayjs().format("DD/MM/YYYY");
        binhLuan.content = document.getElementById("noiDung").value;
        binhLuan.rate = 0;
        // console.log(binhLuan);
        dispatch(postCommentApi(binhLuan));
        messageApi.success("thêm thành công");
        setComment(arrComment);
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendComment();
    }
  };
  return (
    <Fragment>
      {contextHolder}
      <div className="comment_users grid grid-cols-1 gap-4 desktop:grid-cols-2 desktop:gap-x-20 laptop:grid-cols-2 laptop:gap-x-20 mobile:grid-cols-1 gap-y-2 mt-5 ">
        {arrComment?.map(
          ({ id, date_comment, content, user_id, users }, index) => {
            return (
              <div className="comment_users_items mb-5" key={index}>
                <div className="nameUsers_avatar flex   justify-between">
                  <div className="flex">
                    <Fragment key={index}>
                      <div
                        style={{
                          width: "50%",
                        }}
                      >
                        <div
                          key={index}
                          style={{
                            padding: "0",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            className="img_users rounded-full"
                            src={
                              users?.avatar
                                ? DOMAIN_BE_IMG + users.avatar
                                : "https://i.pravatar.cc/50"
                            }
                            alt=""
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="ml-3 font-normal min-w-max">
                        <h4>{users?.full_name}</h4>
                        <p className="text-xs font-thin">{date_comment}</p>
                      </div>
                    </Fragment>
                  </div>
                  <div>
                    <RateStart />
                  </div>
                  <div className="font-thin">
                    <UpdateComment id={id} user_id={user_id} />
                  </div>
                </div>
                <div className=" flex flex-row py-2 font-normal text-neutral-600 ">
                  <span style={{ minWidth: "max-content", marginRight: "5px" }}>
                    bình luận :
                  </span>
                  <EditRenderComment
                    id={id}
                    noiDung={content}
                    setComment={setComment}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
      {layDuLieuLocal("user") ? (
        <div className="flex justify-items-center items-center desktop:mb-0 laptop:mb-0 tablet:mb-0 mb-[30px] laptop:w-[50%] desktop:w-[50%] w-[100%]  ">
          {contextHolder}
          <div
            className="min-w-max"
            style={{
              height: "100%",
              padding: "0",
              borderRadius: "50%",
            }}
          >
            <img
              src={DOMAIN_BE_IMG + getUser.avatar}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="relative z-0 w-full ml-3 mb-3 group">
            <input
              type="text"
              id="noiDung"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onKeyPress={handleKeyPress}
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
            >
              Write an answer ...
            </label>
          </div>
          <div
            style={{
              height: "100%",
              borderRadius: "50%",
            }}
          >
            <button
              id="comment"
              className=" text-black  hover:text-blue-700  p-3 "
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              onClick={sendComment}
            >
              <SendOutlined />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default AddComment;

const UpdateComment = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();
  const id = props?.id;
  // console.log(id);
  const maUserComment = props.maNguoiBinhLuan;
  const dispatch = useDispatch();
  const maUser = layDuLieuLocal("user")?.user;
  const cancel = (e) => {
    message.error("Click on No");
  };
  const items = [
    {
      key: "1",
      label: (
        <Popconfirm
          id="DeleteUser"
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => {
            commentService
              .deleteComment(id)
              .then(async (res) => {
                // console.log(res);
                messageApi.success("Xóa thành công");
                await dispatch(getCommentRoom(params.id));
              })
              .catch((err) => {
                // console.log(err);
                message.error(err);
              });
          }}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button className="py-2 px-8  hover:text-white rounded-sm hover:bg-red-800 duration-500">
            Delete
          </button>
        </Popconfirm>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="py-2 px-10  hover:text-white rounded-sm hover:bg-red-800 duration-500"
          onClick={() => {
            dispatch(layDataSetComment(id));
          }}
        >
          Edit
        </button>
      ),
    },
  ];
  if (layDuLieuLocal("user")) {
    return (
      <Space direction="vertical">
        {contextHolder}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <NavLink className="border-none hover:rounded-full">...</NavLink>
        </Dropdown>
      </Space>
    );
  }
};

const desc = ["rất tệ", "tệ", "bình thường", "tốt", "rất tốt"];
const RateStart = () => {
  const [value, setValue] = useState(5);
  return (
    <span>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
    </span>
  );
};
