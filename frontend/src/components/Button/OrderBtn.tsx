export function HalfOrderBtn() {
  return (
    <div className="flex justify-center items-center w-[48%] p-2.5 border-2 border-[#403535] bg-[#403535] rounded-lg">
      <p className="font-semibold text-white">바로 주문</p>
    </div>
  );
}
export function OrderBtn() {
  return (
    <div className="flex justify-center items-center w-[90%] p-2.5 border-2 border-red-500 bg-red-500 rounded-lg">
      <p className="font-semibold text-white">주문하기</p>
    </div>
  );
}
