import { useEffect, useState } from "react";
import { MyCafeList, IsClose } from "../../types/common";
import { useNavigate } from "react-router-dom";
import mammothLogo from "../../assets/logo/mammoth_logo_notext.png";
import { fetchMyCafe, deleteMyCafe } from "../../services/storeApi";

export default function MyCafelist({ onClose }: IsClose) {
  const [myCafe, setMyCafe] = useState<MyCafeList[]>([]);
  const [bookmarkIds, setBookmarkIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const loadMyCafe = async () => {
      try {
        const myCafeData = await fetchMyCafe();
        setMyCafe(myCafeData);
        setBookmarkIds(new Set(myCafeData.map((c) => c.id)));
      } catch (error) {
        console.error("카페 정보를 불러오는데 실패했습니다:", error);
      }
    };
    loadMyCafe();
  }, []);

  const clickBookmark = async (myStoreId: number) => {
    try {
      await deleteMyCafe(myStoreId);
      alert("MY 매장에서 삭제되었습니다.");
      setBookmarkIds((prev) => {
        const updated = new Set(prev);
        updated.delete(myStoreId);
        return updated;
      });
    } catch (error) {
      alert("MY 매장 삭제 중 오류가 발생했습니다.");
    }
  };
  const clickCafe = (cafeid: number ) => {
    onClose();
    setTimeout(() => {
      navigate(`/order/${cafeid}`); // 애니메이션 후 페이지 이동
    }, 500);
  };
  return (
    <div className="flex flex-col">
      <div>
        <ul className="mb-6">
          {myCafe.map((cafe, index) => (
            <li key={index} className="p-2 border-b-2 border-gray-100">
              <div
                role="button"
                className="flex flex-row items-center"
                onClick={() => clickCafe(cafe.storeId )}
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
