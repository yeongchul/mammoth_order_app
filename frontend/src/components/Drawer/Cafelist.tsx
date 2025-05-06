import { useEffect, useState } from "react";
import { CafeList, IsClose } from "../../types/common";
import { useNavigate } from "react-router-dom";
import mammothLogo from "../../assets/logo/mammoth_logo_notext.png";
import { fetchCafe, fetchMyCafe, addMyCafe } from "../../services/storeApi";

export default function Cafelist({ onClose }: IsClose) {
  const [cafe, setCafe] = useState<CafeList[]>([]);
  const [bookmarkIds, setBookmarkIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const loadCafe = async () => {
      try {
        const cafeData = await fetchCafe();
        const myCafeData = await fetchMyCafe();
        setCafe(cafeData);
        setBookmarkIds(new Set(myCafeData.map((c) => c.storeId)));
      } catch (error) {
        console.error("카페 정보를 불러오는데 실패했습니다:", error);
      }
    };
    loadCafe();
  }, []);

  const clickBookmark = async (storeId: number) => {
    try {
      const isBookmark = bookmarkIds.has(storeId);

      if (!isBookmark) {
        await addMyCafe(storeId);
        alert("MY 매장에 추가되었습니다.");
        setBookmarkIds((prev) => new Set(prev).add(storeId));
      }
    } catch (error) {
      alert("MY 매장 추가 중 오류가 발생했습니다.");
    }
  };
  const clickCafe = (cafeid: number) => {
    onClose();
    setTimeout(() => {
      navigate(`/order/${cafeid}`); // 애니메이션 후 페이지 이동
    }, 500);
  };
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex justify-between bg-[#F4F4F4] p-3.5 items-center mt-0.5">
          <p className="text-sm font-medium text-gray-800">
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
        <ul className="mb-6">
          {cafe.map((cafe, index) => (
            <li key={index} className="p-2 border-b-2 border-gray-100">
              <div
                role="button"
                className="flex flex-row items-center"
                onClick={() => clickCafe(cafe.id)}
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
                    className={`absolute top-0 left-0 bg-white bg-opacity-80 p-[1px] rounded-sm `}
                    onClick={(e) => {
                      e.stopPropagation();
                      clickBookmark(cafe.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={bookmarkIds.has(cafe.id) ? "#EA3323" : "#B7B7B7"}
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
