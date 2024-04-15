import React, { useState, useEffect } from "react";
import { Drawer, message } from "antd";
import { adminUser } from "../../services/adminUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getAllRoomAPI } from "../../redux/slices/roomSLices";

const FormAddRoom = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (params.id != undefined) {
      setOpen(true);
      adminUser
        .adminRoomId(params.id)
        .then((res) => {
          // console.log(res.data.content);
          formik.setValues(res.data.content);
        })
        .catch(
          (err) =>
            // sss
            messageApi.error("Đã xảy ra lỗi!!!")
          // console.log(err)
        );
    }
  }, [params]);
  const formik = useFormik({
    initialValues: {
      id: "",
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      mayGiat: "",
      banLa: "",
      tivi: "",
      dieuHoa: "",
      wifi: "",
      bep: "",
      doXe: "",
      hoBoi: "",
      banUi: "",
      maViTri: "",
      hinhAnh: "",
    },
    validationSchema: yup.object({
      id: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      tenPhong: yup.string().required("Vui lòng không bỏ trống!"),
      khach: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      phongNgu: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      giuong: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      phongTam: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      moTa: yup.string().required("Vui lòng không bỏ trống!"),
      giaTien: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      mayGiat: "",
      banLa: "",
      tivi: "",
      dieuHoa: "",
      wifi: "",
      bep: "",
      doXe: "",
      hoBoi: "",
      banUi: "",
      maViTri: yup
        .number()
        .typeError("Phải là số!!!")
        .required("Vui lòng không bỏ trống!"),
      hinhAnh: yup.string().required("Vui lòng không bỏ trống!"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const res = adminUser
        .adminRoomThem(values)
        .then((res) => {
          messageApi.success("Thêm thành công!!!");
          // console.log(res);
          dispatch(getAllRoomAPI());
        })
        .catch((err) => {
          messageApi.error("Đã xảy ra lỗi!!!");
          // console.log(err);
        });
      formik.resetForm({
        values: {
          id: "",
          tenPhong: "",
          khach: "",
          phongNgu: "",
          giuong: "",
          phongTam: "",
          moTa: "",
          giaTien: "",
          mayGiat: "",
          banLa: "",
          tivi: "",
          dieuHoa: "",
          wifi: "",
          bep: "",
          doXe: "",
          hoBoi: "",
          banUi: "",
          maViTri: "",
          hinhAnh: "",
        },
      });
      setOpen(false);
    },
  });
  const btnCapNhat = async () => {
    try {
      const res = await adminUser.adminRoomPutId(params.id, values);
      // console.log("res: ", res);
    } catch (error) {
      // console.log(error);
      messageApi.error("Đã xảy ra lỗi!!!");
    }
    formik.resetForm({
      values: {
        id: "",
        tenPhong: "",
        khach: "",
        phongNgu: "",
        giuong: "",
        phongTam: "",
        moTa: "",
        giaTien: "",
        mayGiat: "",
        banLa: "",
        tivi: "",
        dieuHoa: "",
        wifi: "",
        bep: "",
        doXe: "",
        hoBoi: "",
        banUi: "",
        maViTri: "",
        hinhAnh: "",
      },
    });
    navigate("/admin/room");
    setOpen(false);
    dispatch(getAllRoomAPI());
  };

  const { handleSubmit, handleChange, handleBlur, values } = formik;
  const {
    id,
    tenPhong,
    khach,
    phongNgu,
    giuong,
    phongTam,
    moTa,
    giaTien,
    maViTri,
    hinhAnh,
  } = formik.errors;

  return (
    <div className="mt-5">
      {contextHolder}
      <button
        onClick={showDrawer}
        className="text-white bg-blue-500 ml-2 my-2 py-2 px-3 rounded-lg hover:bg-blue-600 duration-500 "
      >
        Thêm Phòng
      </button>
      <Drawer
        title="Thông Tin Phòng"
        // placement="right"
        width={600}
        contentWrapperStyle={{ left: "unset", top: "0", bottom: "0" }}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingTop: "10px" }}
        headerStyle={{ padding: "6px" }}
      >
        {/* {contextHolder} */}
        <form onSubmit={handleSubmit}>
          <div className="content_1 grid grid-cols-3">
            <div className="relative z-0 w-full mb-2 px-2 group">
              <input
                disabled={`${params.id ? true : false}`}
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
                type="text"
                name="id"
                id="id"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
              />
              {id && formik.touched.id ? (
                <p className="text-red-500">{id}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="id"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                ID
              </label>
            </div>
            <div className="relative z-0 w-full px-2 mb-2 group">
              <input
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.giaTien}
                type="text"
                name="giaTien"
                id="giaTien"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {giaTien && formik.touched.giaTien ? (
                <p className="text-red-500">{giaTien}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="giaTien"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Giá Tiền
              </label>
            </div>
            <div className="relative z-0 w-full px-2 mb-2 group">
              <input
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.khach}
                type="text"
                name="khach"
                id="khach"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {khach && formik.touched.khach ? (
                <p className="text-red-500">{khach}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="khach"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Số khách
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full  group">
            <input
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.tenPhong}
              type="text"
              name="tenPhong"
              id="tenPhong"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {tenPhong && formik.touched.tenPhong ? (
              <p className="text-red-500">{tenPhong}</p>
            ) : (
              ""
            )}
            <label
              htmlFor="tenPhong"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tên Phòng
            </label>
          </div>

          <div className="content_3 grid grid-cols-4 mt-2">
            <div className="relative z-0 w-full mb-2 px-2 group">
              <input
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.giuong}
                type="text"
                name="giuong"
                id="giuong"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {giuong && formik.touched.giuong ? (
                <p className="text-red-500">{giuong}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="giuong"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Giường
              </label>
            </div>
            <div className="relative z-0 w-full px-2 mb-2 group">
              <input
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phongTam}
                type="text"
                name="phongTam"
                id="phongTam"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {phongTam && formik.touched.phongTam ? (
                <p className="text-red-500">{phongTam}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="phongTam"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phòng tắm
              </label>
            </div>
            <div className="relative z-0 w-full px-2 mb-2 group">
              <input
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phongNgu}
                type="text"
                name="phongNgu"
                id="phongNgu"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {phongNgu && formik.touched.phongNgu ? (
                <p className="text-red-500">{phongNgu}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="phongNgu"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phòng ngủ
              </label>
            </div>
            <div className="relative z-0 w-full px-2 mb-2 group">
              <input
                placeholder=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maViTri}
                type="text"
                name="maViTri"
                id="maViTri"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {maViTri && formik.touched.maViTri ? (
                <p className="text-red-500">{maViTri}</p>
              ) : (
                ""
              )}
              <label
                htmlFor="maViTri"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mã vị trí
              </label>
            </div>
          </div>
          <div className="content_4 grid grid-cols-3 ">
            <div className="content_maygiat m-1 w-50 text-sm text-center border p-2">
              Máy Giặt
              <div className="true_false flex justify-around mt-2">
                <div className="maygiat_true flex items-center">
                  <label
                    htmlFor="maygiatTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="maygiatTrue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="radio"
                    name="mayGiat"
                    value={values.mayGiat == true ? true : true}
                    className={`${
                      values.mayGiat == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 maygiat_false flex items-center">
                  <label
                    htmlFor="maygiatFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="maygiatFalse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="radio"
                    name="mayGiat"
                    value={values.mayGiat == false ? false : false}
                    className={`${
                      values.mayGiat == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
            <div className="content_banLa m-1 w-50 text-sm text-center border p-2">
              Bàn Là
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="banLa_true flex items-center">
                  <label
                    htmlFor="banLaTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="banLaTrue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="radio"
                    name="banLa"
                    value={values.banLa == true ? true : true}
                    className={`${
                      values.banLa == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 banLa_false flex items-center ">
                  <label
                    htmlFor="banLaFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="banLaFalse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="radio"
                    name="banLa"
                    value={values.banLa == false ? false : false}
                    className={`${
                      values.banLa == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
            <div className="content_tivi m-1 w-50 text-sm text-center border p-2">
              TiVi
              <div className="true_false flex justify-around mt-2">
                <div className="tivi_true flex items-center">
                  <label
                    htmlFor="tiviTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="tiviTrue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="tivi"
                    value={values.tivi == true ? true : true}
                    className={`${
                      values.tivi == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 tivi_false flex items-center ">
                  <label
                    htmlFor="tiviFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="tiviFalse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="tivi"
                    value={values.tivi == false ? false : false}
                    className={`${
                      values.tivi == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content_4 grid grid-cols-3 ">
            <div className="content_dieuHoa m-1 w-50 text-sm text-center border p-2">
              Điều Hòa
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="dieuHoa_true flex items-center">
                  <label
                    htmlFor="dieuHoaTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="dieuHoaTrue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="dieuHoa"
                    value={values.dieuHoa == true ? true : true}
                    className={`${
                      values.dieuHoa == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 dieuHoa_false flex items-center ">
                  <label
                    htmlFor="dieuHoaFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="dieuHoaFalse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="dieuHoa"
                    value={values.dieuHoa == false ? false : false}
                    className={`${
                      values.dieuHoa == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
            <div className="content_wifi m-1 w-50 text-sm text-center border p-2">
              Wifi
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="wifi_true flex items-center">
                  <label
                    htmlFor="wifiTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="wifiTrue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="wifi"
                    value={values.wifi == true ? true : true}
                    className={`${
                      values.wifi == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 wifi_false flex items-center ">
                  <label
                    htmlFor="wifiFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="wifiFalse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="wifi"
                    value={values.wifi == false ? false : false}
                    className={`${
                      values.wifi == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
            <div className="content_bep m-1 w-50 text-sm text-center border p-2">
              Bếp
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="bep_true flex items-center">
                  <label
                    htmlFor="bepTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="bepTrue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="bep"
                    value={values.bep == true ? true : true}
                    className={`${
                      values.bep == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 bep_false flex items-center ">
                  <label
                    htmlFor="bepFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="bepFalse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="bep"
                    value={values.bep == false ? false : false}
                    className={`${
                      values.bep == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content_4 grid grid-cols-3 ">
            <div className="content_doXe m-1 w-50 text-sm text-center border p-2">
              Đỗ Xe
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="doXe_true flex items-center">
                  <label
                    htmlFor="doXeTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="doXeTrue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="doXe"
                    value={values.doXe == true ? true : true}
                    className={`${
                      values.doXe == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 doXe_false flex items-center ">
                  <label
                    htmlFor="doXeFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="doXeFalse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="doXe"
                    value={values.doXe == false ? false : false}
                    className={`${
                      values.doXe == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
            <div className="content_hoBoi m-1 w-50 text-sm text-center border p-2">
              Hồ Bơi
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="hoBoi_true flex items-center">
                  <label
                    htmlFor="hoBoiTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="hoBoiTrue"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="hoBoi"
                    value={values.hoBoi == true ? true : true}
                    className={`${
                      values.hoBoi == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 hoBoi_false flex items-center ">
                  <label
                    htmlFor="hoBoiFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="hoBoiFalse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="radio"
                    name="hoBoi"
                    value={values.hoBoi == false ? false : false}
                    className={`${
                      values.hoBoi == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
            <div className="content_banUi m-1 w-50 text-sm text-center border p-2">
              Bàn Ủi
              <div className="true_false flex justify-around mt-2">
                {" "}
                <div className="banUi_true flex items-center">
                  <label
                    htmlFor="banUiTrue"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Có
                  </label>
                  <input
                    id="banUiTrue"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="radio"
                    name="banUi"
                    value={values.banUi == true ? true : true}
                    className={`${
                      values.banUi == true
                        ? "ring-blue-300 ring-2 bg-blue-600 "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
                <div className="ml-2 banUi_false flex items-center ">
                  <label
                    htmlFor="banUiFalse"
                    className="block text-xs font-medium text-gray-900 dark:text-gray-300"
                  >
                    Không
                  </label>
                  <input
                    id="banUiFalse"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="radio"
                    name="banUi"
                    value={values.banUi == false ? false : false}
                    className={`${
                      values.banUi == false
                        ? "ring-blue-300 ring-2 bg-blue-600  "
                        : " "
                    }ml-2 w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-0 w-full mb-2 group">
            <input
              placeholder=""
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

          <div className="mb-2">
            <label
              htmlFor="moTa"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mô tả
            </label>
            <textarea
              id="moTa"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.moTa}
              rows={3}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="mô tả..."
              defaultValue={""}
            />
            {moTa && formik.touched.moTa ? (
              <p className="text-red-500">{moTa}</p>
            ) : (
              ""
            )}
          </div>

          <div className="btn_add_user pt-5">
            <button
              type="submit"
              className={`${
                !params.id ? "inline-block " : "hidden "
              }text-white bg-green-500 duration-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-2/5 ml-2 sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
            >
              Thêm
            </button>
            <button
              onClick={() => {
                btnCapNhat();
              }}
              type="button"
              className={`${
                params.id ? "inline-block " : "hidden "
              } text-white bg-blue-700 duration-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/5 ml-2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              Cập nhật
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
export default FormAddRoom;
