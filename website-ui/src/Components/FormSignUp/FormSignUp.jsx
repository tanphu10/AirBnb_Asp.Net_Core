import { message } from "antd";
import { useFormik } from "formik";
import React from "react";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router";
import * as yup from "yup";
const FormSignUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: " ",
      email: " ",
      password: " ",
      birthday: "",
      phone: " ",
      gender: " ",
      role: " ",
    },
    validationSchema: yup.object({
      id: yup
        .string()
        .required("Vui lòng điền vào ô trống")
        .min(1, "vui lòng chỉ nhập số 0")
        .max(1, "Vui lòng chỉ nhập số 0"),
      name: yup
        .string()
        .matches(/^[\p{L} ]+$/u, "vui lòng chỉ nhập chữ")
        .required("vui lòng điền vào ô input"),
      email: yup
        .string()
        .email("Vui lòng nhập đúng email")
        .required("vui lòng điền vào ô input"),
      password: yup
        .string()
        .required("vui lòng điền vào ô input")
        .min(6, "vui lòng nhập trên 6 chữ"),
      birthday: yup.date().required("vui lòng điền ngày tháng vào ô input"),
      phone: yup
        .string()
        .matches(/^[0-9]*$/, "vui lòng điền số điện thoại")
        .required("vui lòng điền vào ô input")
        .min(10, "vui lòng nhập số điện thoại đúng 10 số")
        .max(10, "vui lòng nhập số điện thoại đúng 10 số"),
      gender: yup.string().required("vui lòng chọn ô input"),
    }),
    // async &await khác với .then.catch khác nhau ở chổ là nếu như .then.catch phải lồng vào nhau
    onSubmit: async (values) => {
      // console.log(values);
      setTimeout(navigate("/signup"), 3000);
      formik.resetForm();
      try {
        // xử lí gửi dữ liệu lên server
        const res = await userService.signup(values);
        // console.log(res);
        messageApi.success("Thêm Người thành công");

        // console.log(res);
      } catch (error) {
        // console.log(error);
        messageApi.error(error.message);
      }
    },
  });

  const { handleChange, handleSubmit, values, handleBlur } = formik;
  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-3 group">
          {/* <label
            for="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID
          </label> */}
          <select
            type="text"
            name="id"
            onChange={handleChange}
            onBlur={handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  peer"
          >
            <option className="pl-10 py-6 border-none" value="0">
              ID
            </option>
          </select>
          {formik.errors.id && formik.touched.id ? (
            <p className="text-red-600">{formik.errors.id}</p>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-red-600">{formik.errors.name}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ Tên
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-600">{formik.errors.password}</p>
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
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-600">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-red-600">{formik.errors.phone}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số Điện Thoại
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="birthday"
              onChange={handleChange}
              onBlur={handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {formik.errors.birthday && formik.touched.birthday ? (
              <p className="text-red-600">{formik.errors.birthday}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ngày Tháng Năm Sinh
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Giới Tính
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="gender"
              value={values.gender}
              // alt={values.toString()}
              className=" border-b-2 text-gray-900 text-sm     w-full p-2  dark:border-b-gray-900 dark:text-black dark:focus:border-b-green-700"
            >
              <option>Your Choose</option>
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
            {formik.errors.gender && formik.touched.gender ? (
              <p className="text-red-600">{formik.errors.gender}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Vai Trò
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="role"
              value={values.role}
              className=" border-b-2 text-gray-900 text-sm     w-full p-2  dark:border-b-gray-900 dark:text-black dark:focus:border-b-green-700"
            >
              {/* <option>Your Choose</option> */}
              {/* <option value="ADMIN">Admin</option> */}
              <option value="USER">User</option>
            </select>
            {formik.errors.role && formik.touched.role ? (
              <p className="text-red-600">{formik.errors.role}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <<<<<<< HEAD */}
        {/* <div className="flex justify-center mt-6"> */}
        {/* ======= */}
        <div className="flex justify-center mt-3">
          {/* >>>>>>> dd97cdc1e8ff43fcf96d0f40ebdf8e5266ecb5bb */}
          <button
            type="submit"
            className="text-center py-1 min-w-full outline-double  outline-lime-600 hover:bg-lime-900 hover:text-white "
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
