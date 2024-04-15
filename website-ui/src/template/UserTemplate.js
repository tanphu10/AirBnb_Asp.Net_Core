import React, { Fragment } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../pages/Loading/Loading";

const UserTemplate = () => {
  const { isLoading } = useSelector((state) => state.loading);
 
  return (
    <Fragment>
      {isLoading ? <Loading /> : <></>}
      <div id="hihi" className=" flex flex-col min-h-full  justify-between">
        <Header  />
        <Outlet />
        <Footer />
      </div>
    </Fragment>
  );
};
export default UserTemplate;
