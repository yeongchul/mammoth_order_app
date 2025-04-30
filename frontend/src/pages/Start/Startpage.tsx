import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Startpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 1000);
    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="flex w-full h-screen bg-[#5D4037] justify-center items-center">
        <img
          src="src/assets/logo/mammoth_logo.png"
          alt="메머드 로고"
          className="w-24"
          style={{
            filter: "brightness(0) invert(1)", // 색 반전
          }}
        />
      </div>
    </>
  );
}
