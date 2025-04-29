export default function Loginpage() {
  return (
    <>
      <div className="flex flex-col w-full h-screen bg-[#5D4037] items-center">
        <img
          src="src/assets/mammoth_logo.png"
          alt="메머드 로고"
          className="flex h-24 mt-[30%]"
          style={{
            filter: "brightness(0) invert(1)",
          }}
        />
        <div
          role="button"
          className="flex bg-yellow-400 w-[85%] h-[8%] rounded-md mt-[30%]
         justify-center items-center flex-row font-extrabold"
        >
          카카오 로그인
        </div>
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
