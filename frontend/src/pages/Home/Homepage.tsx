import HomeHeader from "../../components/Header/HomeHeader";
import MyMenuBox from "./MyMenuBox";
import OrderBox from "./OrderBox";
import RecommendBox from "./RecommendBox";
import ShowBanner from "./ShowBanner";

export default function Homepage() {
  return (
    <div className="h-screen bg-gray-100 overflow-auto">
      <HomeHeader />
      <ShowBanner />
      <OrderBox />
      <RecommendBox />
      <MyMenuBox />
    </div>
  );
}
