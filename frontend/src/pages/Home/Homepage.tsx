import HomeHeader from "../../components/Header/HomeHeader";
import MyMenuBox from "./MyMenuBox";
import OrderBox from "./OrderBox";
import RecommendBox from "./RecommendBox";
import ShowBanner from "./ShowBanner";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="h-screen bg-[#F7F7F7] overflow-auto">
      <HomeHeader />
      <ShowBanner />
      <OrderBox />
      <RecommendBox />
      <MyMenuBox />
    </div>
  );
}
