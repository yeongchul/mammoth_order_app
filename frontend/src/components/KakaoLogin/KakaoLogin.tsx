export default function KakaoLogin() {
  const handleLogin = () => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div
      role="button"
      className="flex bg-yellow-400 w-[85%] h-[8%] rounded-md mt-[30%]
         justify-center items-center flex-row font-extrabold"
      onClick={handleLogin}
    >
      카카오 로그인
    </div>
  );
}
