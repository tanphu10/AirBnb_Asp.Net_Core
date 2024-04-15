import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { adminUser } from "../../services/adminUser";
import {
  layDuLieuLocal,
  luuXuongLocal,
  xoaLocal,
} from "../../util/localStorage";
import { adminRole } from "../../redux/slices/adminUserSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message, Space } from "antd";
const FormAdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const formik = useFormik({
    initialValues: {
      email: "",
      pass_word: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Vui lòng không để trống")
        .email("Phải là email!!")
        .min(3, "Vui lòng nhập trên 3 ký tự"),
        pass_word: yup
        .string()
        .required("Vui lòng không để trống")
        .min(3, "Vui lòng nhập trên 3 ký tự"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const ressult = adminUser
        .adminLogin(values)
        .then((res) => {
          luuXuongLocal("admin", res.data.content);
          const admin = layDuLieuLocal("admin");
          if (admin.user.role == "ADMIN") {
            messageApi.success("Đăng Nhập ADMIN thành công!!!");
            setTimeout(() => {
              navigate("/admin");
            }, [3000]);
          } else {
            setTimeout(() => {
              messageApi.error("Không phải ADMIN!!!");
              window.location.href = "https://google.com.vn";
            }, [1000]);
            xoaLocal("admin");
          }
        })
        .catch((err) => {
          // console.log(err);
          messageApi.error("Đã xảy ra lỗi!!!");
        });
    },
  });
  const { handleSubmit, handleChange, handleBlur } = formik;
  const { email, pass_word } = formik.errors;
  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tài khoản
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {email && formik.touched.email ? (
            <p className="text-red-500">{email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mật Khẩu
          </label>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            id="pass_word"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {pass_word && formik.touched.pass_word ? (
            <p className="text-red-500">{pass_word}</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng Nhập
        </button>
      </form>
    </>
  );
};

export default FormAdminLogin;
