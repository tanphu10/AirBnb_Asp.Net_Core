import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import RoomDetails from "./Components/RoomDetails/RoomDetails";
import NotFound from "./pages/NotFound/NotFound";
import Loading from "./pages/Loading/Loading";
import InfoUser from "./pages/InfoUser/InfoUser";

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
        <Route path="*" element={<NotFound />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
