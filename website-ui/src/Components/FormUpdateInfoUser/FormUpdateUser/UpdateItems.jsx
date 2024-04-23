import { message } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { userService } from "./../../../shared/services/userService";
import { getInfoUserApi } from "../../../redux/slices/userSlice";
import { getUser } from "../../../shared/function/token-storage";

const UpdateItems = (props) => {
  // console.log(props);
  const { setIsModalOpen } = props;
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { ObUser } = useSelector((state) => state.user);
  const userId = getUser().id;
  useEffect(() => {
    if (ObUser) {
      formik.setValues(ObUser);
    }
  }, [ObUser]);
  const formik = useFormik({
    initialValues: {
      id: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      dateCreated: "",
      roles: [""],
      balance: 0,
    },
    validationSchema: yup.object({
      phoneNumber: yup
        .string()
        .matches(/^[0-9]*$/, "please fill in the input number")
        .required("please fill in the input box")
        .min(10, "please input exactly number phone")
        .max(10, "please input exactly number phone"),
      lastName: yup
        .string()
        .matches(/^[\p{L} ]+$/u, "please input letter")
        .required("please fill in the input box"),
    }),
    // async &await khác với .then.catch khác nhau ở chổ là nếu như .then.catch phải lồng vào nhau
    onSubmit: async (values) => {
      console.log("values check >>>", values);
      try {
        // xử lí gửi dữ liệu lên server
        const res = await userService.updateUser(getUser().id, values);
        console.log("cjecl ", res);
        dispatch(getInfoUserApi(userId));
        messageApi.success("update thành công");
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
        messageApi.error(error.message);
      }
      formik.resetForm({
        values: {
          id: "",
          lastName: "",
          userName: "",
          email: "",
          phoneNumber: "",
          dateCreated: "",
          roles: [""],
          balance: 0,
        },
      });
    },
  });
  const { handleChange, handleSubmit, values, handleBlur } = formik;

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-3 group bg-zinc-600  ">
          <input
            type="text"
            name="id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.id}
            readOnly={true}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-orange-600"
            placeholder=" "
          />
          {formik.errors.id && formik.touched.id ? (
            <p className="text-red-600">{formik.errors.id}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group  bg-zinc-600">
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userName}
            className="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.userName && formik.touched.userName ? (
            <p className="text-red-600">{formik.errors.userName}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserName
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <p className="text-red-600">{formik.errors.lastName}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tên
          </label>
        </div>

        <div className="relative z-0 w-full mb-3 group  bg-zinc-600">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="block py-2 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            readOnly={true}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-600">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              value={values.phoneNumber}
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
              <p className="text-red-600">{formik.errors.phoneNumber}</p>
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
          <div className="relative z-0 w-full mb-3 group  bg-zinc-600">
            <input
              type="text"
              name="dateCreated"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dateCreated}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              readOnly={true}
            />
            {formik.errors.dateCreated && formik.touched.dateCreated ? (
              <p className="text-red-600">{formik.errors.dateCreated}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ngày tạo
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <button
            type="submit"
            className="text-center py-1 min-w-full outline-double  outline-yellow-600 hover:bg-yellow-400 hover:text-white "
          >
            Cập Nhập Thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItems;
