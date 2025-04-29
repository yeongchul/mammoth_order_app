import { useState, useEffect } from "react";

export default function ShowBanner() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalBanners = 6;

  // 마우스 이벤트 핸들러
  // 마우스 클릭 시 호출
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  //마우스 이동 시 호출
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const moveDistance = startX - e.clientX;
    const threshold = 50; // 스와이프 임계값

    // 임계값 이상 움직였을 때만 슬라이드 변경
    if (Math.abs(moveDistance) > threshold) {
      if (moveDistance > 0) {
        // 오른쪽으로 스와이프: 다음 배너
        setCurrentIndex((prev) => (prev === totalBanners - 1 ? 0 : prev + 1));
      } else if (moveDistance < 0 && currentIndex >= 0) {
        // 왼쪽으로 스와이프: 이전 배너
        setCurrentIndex((prev) => (prev === 0 ? totalBanners - 1 : prev - 1));
      }
      setIsDragging(false);
    }
  };
  //마우스 떼었을 때 호출
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  // 마우스가 슬라이더 영역 벗어났을 때
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalBanners - 1 ? 0 : prev + 1));
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div // 배너 가로로 정렬해서 화면 안에만 보이게 설정
        className="flex transition-transform duration-500 ease-in-out"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="min-w-full">
          <img
            src="src/assets/banner/banner1.jpg"
            className="w-full"
            alt="Banner 1"
          />
        </div>
        <div className="min-w-full">
          <img
            src="src/assets/banner/banner2.jpg"
            className="w-full"
            alt="Banner 2"
          />
        </div>
        <div className="min-w-full">
          <img
            src="src/assets/banner/banner3.jpg"
            className="w-full"
            alt="Banner 3"
          />
        </div>
        <div className="min-w-full">
          <img
            src="src/assets/banner/banner4.jpg"
            className="w-full"
            alt="Banner 4"
          />
        </div>
        <div className="min-w-full">
          <img
            src="src/assets/banner/banner5.jpg"
            className="w-full"
            alt="Banner 5"
          />
        </div>
        <div className="min-w-full">
          <img
            src="src/assets/banner/banner6.jpg"
            className="w-full"
            alt="Banner 6"
          />
        </div>
      </div>
    </div>
  );
}
