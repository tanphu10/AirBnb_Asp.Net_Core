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
      id: " ",
      full_name: " ",
      email: " ",
      pass_word: " ",
      birth_day: "",
      phone: " ",
      gender: true,
      role: " ",
    },
    validationSchema: yup.object({
      id: yup
        .string()
        .required("please fill in the input box")
        .min(1, "please input minimum 1 number")
        .max(4, "please input maximum 4 number"),
      email: yup
        .string()
        .email("Please input email!")
        .required("please fill in the input box"),
      pass_word: yup
        .string()
        .required("please fill in the input box")
        .min(6, "please input minimum 6 letter"),
      // birthday: yup.date().required("Please fill in the input date"),
      birthday: yup.date().required("Please fill in the input date"),
      phone: yup
        .string()
        .matches(/^[0-9]*$/, "please fill in the input number")
        .required("please fill in the input box")
        .min(10, "please input exactly number phone")
        .max(10, "please input exactly number phone"),
      name: yup
        .string()
        .matches(/^[\p{L} ]+$/u, "please input letter")
        .required("please fill in the input box"),
      gender: yup.string().required("please fill in the input box"),
    }),
    // async &await khác với .then.catch khác nhau ở chổ là nếu như .then.catch phải lồng vào nhau
    onSubmit: async (values) => {
      console.log("values check >>>", values);
      try {
        // xử lí gửi dữ liệu lên server
        const res = await userService.adminUserIdPut(getUser().id, values);
        console.log(res);
        dispatch(getInfoUserApi(userId));
        messageApi.success("update thành công");
      } catch (error) {
        console.log(error);
        messageApi.error(error.message);
      }
      formik.resetForm({
        values: {
          id: "",
          email: "",
          pass_word: "",
          birth_day: "",
          full_name: "",
          phone: "",
          role: "",
          gender: true,
        },
      });
    },
  });
  const { handleChange, handleSubmit, values, handleBlur } = formik;
  // console.log("check>>>", values);
  const btnCapNhat = async () => {
    try {
      await userService.adminUserIdPut(userId, values);
      messageApi.success("cập nhập thành công!!!");
    } catch (error) {
      console.log(error);
      messageApi.error("Đã xảy ra lỗi!!!");
    }
    formik.resetForm({
      values: {
        id: "",
        email: "",
        full_name: "",
        pass_word: "",
        birthday: "",
        name: "",
        phone: "",
        role: "",
        gender: true,
      },
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-3 group  bg-orange-600">
          <input
            type="text"
            name="id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.id}
            readOnly={true}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="full_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.full_name}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.full_name && formik.touched.full_name ? (
            <p className="text-red-600">{formik.errors.full_name}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            full_name
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="pass_word"
            value={values.pass_word}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          {formik.errors.pass_word && formik.touched.pass_word ? (
            <p className="text-red-600">{formik.errors.pass_word}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-3 group">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              value={values.phone}
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
              Number Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="birth_day"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.birth_day}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            {formik.errors.birth_day && formik.touched.birth_day ? (
              <p className="text-red-600">{formik.errors.birth_day}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Birthday
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="gender"
              value={values.gender}
              className=" border-b-2 text-gray-900 text-sm     w-full p-2  dark:border-b-gray-900 dark:text-black dark:focus:border-b-green-700"
            >
              <option>Your Choose</option>
              <option value="true">Male</option>
              <option value="false">Female</option>
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
              Role
            </label>
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="role"
              value={values.role}
              className=" border-b-2 text-gray-900 text-sm     w-full p-2  dark:border-b-gray-900 dark:text-black dark:focus:border-b-green-700"
            >
              {/* <option>Your Choose</option> */}
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
            {formik.errors.role && formik.touched.role ? (
              <p className="text-red-600">{formik.errors.role}</p>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <button
            type="button"
            onClick={() => {
              btnCapNhat();
            }}
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
