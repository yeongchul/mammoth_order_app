import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home/Homepage";
import Beveragepage from "../pages/Order/Beveragepage";
// import Cartpage from "../pages/Cart/Cartpage";
import Loginpage from "../pages/Login/Loginpage";
import Startpage from "../pages/Start/Startpage";
import Orderpage from "../pages/Order/Orderpage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Startpage />} />
      <Route path="/home" element={<Homepage />} />
      {/* <Route path="/cart" element={<Cartpage />} /> */}
      <Route path="/login" element={<Loginpage />} />
      <Route path="/order/:cafename" element={<Orderpage />} />
    </Routes>
  );
};

export default Router;
