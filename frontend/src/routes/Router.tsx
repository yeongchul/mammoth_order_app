import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home/Homepage";
// import Cartpage from "../pages/Cart/Cartpage";
import Loginpage from "../pages/Login/Loginpage";
import Startpage from "../pages/Start/Startpage";
import Orderpage from "../pages/Order/Orderpage";
import PrivateRoute from "../components/KakaoLogin/PrivateRoute";
import KakaoCallbackPage from "../components/KakaoLogin/KakaoCallbackPage";

const Router = () => {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/login" element={<Loginpage />} />
      <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
      <Route path="/" element={<Startpage />} />

      {/* 인증 필요 라우트 */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Homepage />} />
        {/* <Route path="/cart" element={<Cartpage />} /> */}
        <Route path="/order/:cafename" element={<Orderpage />} />
      </Route>
    </Routes>
  );
};

export default Router;
