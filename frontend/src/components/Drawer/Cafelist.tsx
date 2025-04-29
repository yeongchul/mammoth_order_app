import { CafeList, IsClose, CafelistProps } from "../../types/common";

export default function Cafelist({ type }: CafelistProps) {
  const Cafelist: CafeList[] = [
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
  ];
  const myCafelist: CafeList[] = [
    {
      name: "중림한국경제점",
      address: "서울특별시 중구 청파로 461, 1층(중림동)",
    },
  ];
  const listToShow: CafeList[] = type === "nearby" ? Cafelist : myCafelist;
  return (
    <div className="flex flex-col h-screen">
      <div className="overflow-y-scroll">
        {type == "nearby" && (
          <div className="flex justify-between bg-gray-100 p-4 items-center">
            <p className="font-semibold text-sm text-gray-500">
              내 위치로부터 반경 2km 이내의 매장입니다.
            </p>
            <img src="src\assets\icon\icon_restart.png" alt="새로고침아이콘" />
          </div>
        )}
        <ul>
          {listToShow.map((cafe, index) => (
            <li key={index} className="p-2 border-b-2 border-gray-100">
              <div className="flex flex-row items-center">
                <div className="flex justify-center items-center bg-[#5D4037] w-14 h-14 rounded-xl mr-3">
                  <img
                    src="src\assets\logo\mammoth_logo_notext.png"
                    alt="글자없는매머드로고"
                    className=""
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
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
