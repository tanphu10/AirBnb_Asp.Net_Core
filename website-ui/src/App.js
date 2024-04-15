import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import AdminTemplate from "./template/AdminTemplate";
import AdminUser from "./Components/AdminUser/AdminUser";
import AdminLocation from "./Components/AdminLocation/AdminLocation";
import AdminRoom from "./Components/AdminRoom/AdminRoom";
import AdminStandar from "./pages/AdminStandar/AdminStandar";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ListRoom from "./Components/ListRoom/ListRoom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import RoomDetails from "./Components/RoomDetails/RoomDetails";
import NotFound from "./pages/NotFound/NotFound";
import Loading from "./pages/Loading/Loading";
import InfoUser from "./pages/InfoUser/InfoUser";
import FormAdminLocation from "./Components/FormAdminLocation/FormAdminLocation";
import AdminRent from "./Components/AdminRent/AdminRent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          {/* <Route index element={<ListRoom />} /> */}
          <Route index element={<HomePage />} />
          {/* <Route index element={<ListRoom />} /> */}
          <Route path="/detail">
            <Route path=":id" element={<RoomDetails />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/infouser" element={<InfoUser />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminTemplate />}>
          <Route index element={<AdminStandar />} />
          <Route path="user" element={<AdminUser />}>
            <Route path=":id" element={<AdminUser />} />
          </Route>
          <Route path="rent" element={<AdminRent />}>
            <Route path=":id" element={<AdminRent />} />
          </Route>
          <Route path="location" element={<AdminLocation />}>
            <Route path=":id" element={<FormAdminLocation />} />
          </Route>
          <Route path="room" element={<AdminRoom />}>
            <Route path=":id" element={<AdminRoom />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
