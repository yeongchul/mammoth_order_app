export default function MyMenuBox() {
  return (
    <div className="p-4 mb-8">
      <div className="flex justify-between items-center">
        <p className="font-bold text-md">MY메뉴</p>
        <p className="font-semibold text-xs text-gray-500">더보기</p>
      </div>
      <div className="mt-4 pt-4 pb-4 bg-white w-full h-24 shadow-sm rounded-lg">
        <div className="mt-6 mr-6 ml-6 border-t-2 border-gray-100"></div>
        <div className="flex flex-row w-full justify-center mt-3">
          <div className="p-0 bg-gray-400 w-3.5 h-3.5 rounded-full mt-1 mr-1">
            <img
              src="src/assets/icon_add.png"
              alt="추가아이콘"
              style={{
                filter: "invert(1)",
              }}
            />
          </div>
          <p className="text-gray-700 text-[13px]">MY메뉴 추가</p>
        </div>
      </div>
    </div>
  );
}
