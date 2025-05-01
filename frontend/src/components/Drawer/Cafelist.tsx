import { useState } from "react";
import { CafeList, IsClose, CafelistProps } from "../../types/common";
import { useNavigate } from "react-router-dom";
import mammothLogo from "../../assets/logo/mammoth_logo_notext.png";

export default function Cafelist({ type, onClose }: CafelistProps & IsClose) {
  const navigate = useNavigate();
  const Cafelist: CafeList[] = [
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    { name: "명동점", address: "서울특별시 중구 명동길 14" },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
    {
      name: "충정로점",
      address: "서울특별시 서대문구 경기대로 26-22",
    },
    // 12개
  ];
  const myCafelist: CafeList[] = [
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
  ];
  const listToShow: CafeList[] = type === "nearby" ? Cafelist : myCafelist;
  const [isBookmark, setIsBookmark] = useState<boolean[]>(
    // Array(listToShow.length).fill(false)
    listToShow.map((_, index) => (type === "nearby" ? false : true))
  );
  const clickBookmark = (index: number) => {
    setIsBookmark((prev) => {
      const updated = [...prev];
      if (updated[index] == false) {
        alert("MY 매장에 추가되었습니다.");
      } else {
        alert("MY 매장에서 삭제되었습니다.");
      }
      updated[index] = !updated[index];
      return updated;
    });
  };
  const clickCafe = (cafename: string) => {
    onClose();
    setTimeout(() => {
      navigate(`/order/${cafename}`); // 애니메이션 후 페이지 이동
    }, 500);
  };
  return (
    <div className="flex flex-col">
      <div>
        {type == "nearby" && (
          <div className="flex justify-between bg-[#F4F4F4] p-3.5 items-center mt-0.5">
            <p className="text-sm font-medium text-gray-600">
              내 위치로부터 반경 2km 이내의 매장입니다.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#545454"
            >
              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
            </svg>
          </div>
        )}
        <ul className="mb-6">
          {listToShow.map((cafe, index) => (
            <li key={index} className="p-2 border-b-2 border-gray-100">
              <div
                role="button"
                className="flex flex-row items-center"
                onClick={() => clickCafe(cafe.name)}
              >
                <div className="flex relative justify-center items-center bg-[#5D4037] w-14 h-14 rounded-xl mr-3">
                  <img
                    src={mammothLogo}
                    alt="글자없는매머드로고"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                  <div
                    role="button"
                    className={`absolute top-0 left-0 bg-white bg-opacity-80 p-[1px] rounded-sm ${
                      isBookmark[index] ? "bg-red-200" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      clickBookmark(index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={isBookmark[index] ? "#EA3323" : "#B7B7B7"}
                    >
                      <path d="M6 2C4.9 2 4 2.9 4 4v18l8-3.2 8 3.2V4c0-1.1-.9-2-2-2H6z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <p className="text-lg mb-1">{cafe.name}</p>
                  </div>
                  <p className="text-xs mb-1">{cafe.address}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
