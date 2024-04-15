import React from "react";
import { useEffect } from "react";
import * as yup from "yup";
import { Button, message, Space } from "antd";
import { adminUser } from "../../services/adminUser";
import { getAllLocation, getAllUser } from "../../redux/slices/adminUserSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
const FormAdminLocation = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    if (params.id != undefined) {
      adminUser
        .getLocationId(params.id)
        .then((res) => {
          // console.log(res);
          formik.setValues(res.data.content);
        })
        .catch(
          (err) => messageApi.error("Đã xảy ra lỗi!!!")
          // console.log(err)
        );
    }
  }, [params]);
  const formik = useFormik({
    initialValues: {
      id: "",
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    },
    validationSchema: yup.object({
      id: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      tenViTri: yup.string().required("Vui lòng không bỏ trống!"),
      tinhThanh: yup.string().required("Vui lòng không bỏ trống!"),
      quocGia: yup.string().required("Vui lòng không bỏ trống!"),
      hinhAnh: yup.string().required("Vui lòng không bỏ trống!"),
    }),
    onSubmit: (values) => {
      // console.log(values);

      const res = adminUser
        .getLocationAdd(values)
        .then((res) => {
          messageApi.success("Thêm thành công!!!");
          // console.log(res);
          dispatch(getAllLocation());
        })
        .catch((err) => {
          messageApi.error("Đã xảy ra lỗi!!!");
          // console.log(err);
        });
      formik.resetForm({
        values: {
          id: "",
          tenViTri: "",
          tinhThanh: "",
          quocGia: "",
          hinhAnh: "",
        },
      });
    },
  });
  const btnCapNhat = async () => {
    try {
      const res = await adminUser.putLocationId(params.id, values);
      // console.log("res: ", res);
    } catch (error) {
      messageApi.error("Đã xảy ra lỗi!!!");
      // console.log(error);
    }
    formik.resetForm({
      values: {
        id: "",
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: "",
      },
    });
    navigate("/admin/location");
    dispatch(getAllLocation());
  };

  const { handleSubmit, handleChange, handleBlur, values } = formik;
  const { id, tenViTri, tinhThanh, quocGia, hinhAnh } = formik.errors;
  return (
    <div>
      {contextHolder} 
      {/* <h1 className="bold text-4xl mb-3">Thêm người dùng</h1> */}
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
            value={values.tenViTri}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="tenViTri"
            id="tenViTri"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {tenViTri && formik.touched.tenViTri ? (
            <p className="text-red-500">{tenViTri}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="=tenViTri"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tên Vị Trí
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={values.tinhThanh}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="tinhThanh"
            id="tinhThanh"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {tinhThanh && formik.touched.tinhThanh ? (
            <p className="text-red-500">{tinhThanh}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="tinhThanh"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tỉnh Thành
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={values.quocGia}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="quocGia"
            id="quocGia"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {quocGia && formik.touched.quocGia ? (
            <p className="text-red-500">{quocGia}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Quốc Gia
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            value={values.hinhAnh}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="hinhAnh"
            id="hinhAnh"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {hinhAnh && formik.touched.hinhAnh ? (
            <p className="text-red-500">{hinhAnh}</p>
          ) : (
            ""
          )}
          <label
            htmlFor="hinhAnh"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Hình Ảnh
          </label>
        </div>

        <div className="btn_add_user">
          <button
            type="submit"
            className="text-white bg-green-500 duration-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-2/5 ml-2 sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Thêm
          </button>
          <button
            disabled={params.id ? false : true}
            onClick={() => {
              btnCapNhat();
            }}
            type="button"
            className={`${
              params.id ? "inline-block" : "hidden"
            } text-white bg-blue-700 duration-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/5 ml-2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdminLocation;
