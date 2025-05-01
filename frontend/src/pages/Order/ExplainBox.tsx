export default function ExplainBox() {
  return (
    <div className="flex flex-col p-5 mt-3 text-gray-600">
      <p className="font-extrabold text-sm text-gray-700 mb-5">
        위탁결제대행사
      </p>
      <div className="text-[11px]">
        <p className="mb-1">
          (주)발트페이 대표이사: 최영우 | 사업자등록번호: 453-86-02429
        </p>
        <p className="mb-1">통신판매업신고번호: 제2023-성남분당B-0019호</p>
        <p className="mb-1">
          경기도성남시분당구성남대로779번길6, 2층(이매동, KT분당지사)
        </p>
        <p className="mt-7">
          -발트페이는 통신판매중개자이며 통신판매의 당사자가 아닙니다.
        </p>
        <p>
          -따라서 발트페이는 상품거래정보 및 거래에 대한 책임을 지지 않습니다.
        </p>
        <div className="flex flex-row items-center justify-center pt-5 pb-5 mt-3">
          <p>서비스 이용약관</p>
          <p className="mr-1 ml-1 text-gray-400">|</p>
          <p>개인정보수집이용동의</p>
          <p className="mr-1 ml-1 text-gray-400">|</p>
          <p>위치기반서비스이용동의</p>
        </div>
      </div>
    </div>
  );
}
