import KakaoLogin from "../../components/KakaoLogin/KakaoLogin";
import mammothlogo from "../../assets/logo/mammoth_logo.png";

export default function Loginpage() {
  return (
    <>
      <div className="flex flex-col w-full h-screen bg-[#5D4037] items-center">
        <img
          src={mammothlogo}
          alt="메머드 로고"
          className="flex h-24 mt-[30%]"
          style={{
            filter: "brightness(0) invert(1)",
          }}
        />
        <div className="h-40"></div>
        <KakaoLogin />
        <div
          role="button"
          className="flex bg-white w-[85%] h-[8%] rounded-md mt-5
         justify-center items-center flex-row font-extrabold"
        >
          다른 방법으로 로그인
        </div>
      </div>
    </>
  );
}
