import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home/Homepage";
import Beveragepage from "../pages/Beverage/Beveragepage";
// import Cartpage from "../pages/Cart/Cartpage";
import Loginpage from "../pages/Login/Loginpage";
import Startpage from "../pages/Start/Startpage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Startpage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/beverage" element={<Beveragepage />} />
      {/* <Route path="/cart" element={<Cartpage />} /> */}
      <Route path="/login" element={<Loginpage />} />
    </Routes>
  );
};

export default Router;
