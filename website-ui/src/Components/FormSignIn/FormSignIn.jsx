import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { userService } from "../../services/userService";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setDataName } from "../../redux/slices/userSlice";
import {
  saveRefreshToken,
  saveToken,
  saveUser,
} from "../../shared/function/token-storage";
const FormSignIn = (props) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      formik.resetForm();
      userService
        .signin(values)
        .then((res) => {
          // console.log(res);
          if (res.data) {
            // console.log(res)
            saveToken(res.data.token);
            saveRefreshToken(res.data.refreshToken);
            saveUser(res.data);
            messageApi.success("Đăng nhập thành công");
            dispatch(setDataName(res.data.token));
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          messageApi.error(err);
        });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("vui lòng nhập đúng địa chỉ email !!")
        .required("Vui Lòng Điền email"),
      password: yup.string().required("Vui lòng Điền Mật Khẩu"),
      // .min(3, "please input more than 3 letter"),
    }),
  });

  const { handleSubmit, handleChange, handleBlur } = formik;
  const { email, password } = formik.errors;
  return (
    <div id="">
      {contextHolder}
      <NavLink
        to="/"
        className="logo flex justify-center items-center sm:text-lg  my-5"
      >
        <i
          className="fa-brands fa-airbnb sm:text-sm"
          style={{ color: "#ff5a1f", fontSize: "40px" }}
        />
      </NavLink>
      <div className="flex justify-center items-center">
        {" "}
        <span className="hidden tablet:flex self-center font-bold text-orange-500 text-3xl whitespace-nowrap ml-3 sm:text-sm">
          Chào Mừng Đến Với Airbnb
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-10 group ">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            status={email && formik.touched.email ? "error" : ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {email && formik.touched.email ? (
            <p className="text-red-600">{email}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-14 group">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            status={password && formik.touched.password ? "error" : ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {password && formik.touched.password ? (
            <p className="text-red-600">{password}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mật Khẩu
          </label>
        </div>
        <button
          type="submit"
          className="text-black border border-orange-600 hover:bg-orange-500 hover:text-white rounded-lg focus:outline-none focus:text-white: font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-white mb-8 transition duration-700"
        >
          Đăng Nhập
        </button>
        <span className="text-black">
          Đăng kí tài khoản?{" "}
          <NavLink
            to="/signup"
            className={{ hover: "text-orange-700" }}
            onCancel={props.handleCancel}
          >
            Đăng Kí
          </NavLink>
        </span>
      </form>
    </div>
  );
};

export default FormSignIn;
