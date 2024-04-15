import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Button, message, Space } from "antd";
import { adminUser } from "../../services/adminUser";
import { getAllUser } from "../../redux/slices/adminUserSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const FormAdminUser = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    if (params.id != undefined) {
      adminUser
        .adminUserId(params.id)
        .then((res) => {
          // console.log(res);
          formik.setValues(res.data.content);
        })
        .catch(
          (error) => messageApi.error("Đã xảy ra lỗi!!!")
          // console.log(err)
        );
    }
  }, [params]);
  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      pass_word: "",
      birth_day: "",
      full_name: "",
      phone: "",
      role: "",
      gender: true,
    },
    validationSchema: yup.object({
      id: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      email: yup
        .string()
        .required("Vui lòng không bỏ trống!")
        .email("Phải là email!")
        .min(3, "Vui lòng nhập trên 3 ký tự"),
      pass_word: yup.string().required("Vui lòng không bỏ trống!"),
      birth_day: yup.date().required("Vui lòng không bỏ trống!"),
      full_name: yup.string().required("Vui lòng không bỏ trống!"),
      phone: yup.number("Phải là số!").required("Vui lòng không bỏ trống!"),
      role: yup.string(),
      gender: yup.string(),
    }),
    onSubmit: (values) => {
      // console.log(values);

      const res = adminUser
        .adminUserThem(values)
        .then((res) => {
          messageApi.success("Thêm thành công!!!");
          // console.log(res);
          dispatch(getAllUser());
        })
        .catch((err) => {
          messageApi.error("Đã xảy ra lỗi!!!");
          // console.log(err);
        });
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
  const btnCapNhat = async () => {
    try {
      const res = await adminUser.adminUserIdPut(params.id, values);
      // console.log("res: ", res);
      messageApi.success("cập nhập thành công!!!");
      dispatch(getAllUser());
    } catch (error) {
      // console.log(error);
      messageApi.error("Đã xảy ra lỗi!!!");
    }
    formik.resetForm({
      values: {
        id: "",
        email: "",
        pass_word: "",
        birthday: "",
        name: "",
        phone: "",
        role: "",
        gender: true,
      },
    });
    navigate("/admin/user");
  };

  const { handleSubmit, handleChange, handleBlur, values } = formik;
  const { id, email, pass_word, birth_day, full_name, phone, role, gender } =
    formik.errors;

  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full h-auto mb-6 group">
          <input
            disabled={params.id ? true : false}
            value={values.id}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="id"
            id="id"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {id && formik.touched.id ? <p className="text-red-500">{id}</p> : ""}
          <label
            htmlFor="=id"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>
        <div className="relative z-0 w-full h-auto mb-6 group">
          <input
            disabled={params.id ? true : false}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {email && formik.touched.email ? (
            <p className="text-red-500">{email}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="=email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={values.pass_word}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="pass_word"
            id="pass_word"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {pass_word && formik.touched.pass_word ? (
            <p className="text-red-500">{pass_word}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={values.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="full_name"
            id="full_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {full_name && formik.touched.full_name ? (
            <p className="text-red-500">{full_name}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ Tên
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={values.birth_day}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="birth_day"
              id="birthday"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {birth_day && formik.touched.birth_day ? (
              <p className="text-red-500">{birth_day}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="birthday"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ngày Sinh
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="gender"
              id="gender"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              {params.id != undefined ? (
                <>
                  <option value={values.gender}>
                    {values.gender ? "NAM" : "NU"}
                  </option>
                </>
              ) : (
                <>
                  {" "}
                  <option value={values.gender}>Nam</option>
                  <option value={!values.gender}>NU</option>
                </>
              )}
            </select>
            {gender && formik.touched.gender ? (
              <p className="text-red-500">{gender}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {phone && formik.touched.phone ? (
              <p className="text-red-500">{phone}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số Điện Thoại
            </label>
          </div>
          <div className="relative group">
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="role"
              id="role"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              {params.id != undefined ? (
                <>
                  <option value={values.gender}>
                    {values.role == "USER" ? "USER" : "ADMIN"}
                  </option>
                </>
              ) : (
                <>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </>
              )}
            </select>
            {role && formik.touched.role ? (
              <p className="text-red-500">{role}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="btn_add_user">
          <button
            type="submit"
            className=" outline outline-offset-0 outline-lime-600 px-10 py-2 hover:bg-lime-600 hover:text-white duration-500"
          >
            Thêm
          </button>
          <button
            disabled={params.id ? false : true}
            onClick={() => {
              btnCapNhat();
              navigate("/admin/user");
            }}
            type="button"
            className={`${
              params.id ? "inline-block" : "hidden"
            } outline outline-offset-0 outline-orange-500 px-7 py-2 hover:bg-yellow-600 hover:text-white  mx-10 duration-500`}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdminUser;
