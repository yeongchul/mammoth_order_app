import { useAuth } from "../../contexts/AutoContext";
import { useNavigate } from "react-router-dom";
import { IsClose } from "../../types/common";
import { motion } from "framer-motion";
import SettingHeader from "../../components/Header/SettingHeader";
import { useState } from "react";

export default function Settingpage({ onClose }: IsClose){
    const { logout } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
  const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
      };
      return(
        <motion.div
      className="fixed inset-0 bg-white z-50"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        <SettingHeader onClose={onClose}/>
        <div className="h-screen bg-[#ECECEC] text-sm">
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>닉네임 변경</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>개인정보 활용 동의</p>
            </div>
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>위치 정보 사용동의 설정</p>
                <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="toggle toggle-md border-none text-gray-200 bg-gray-400  checked:bg-red-400 checked:text-red-700"
            />
            </div>
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>마케팅 활용 동의 설정(선택)</p>
                <input
              type="checkbox"
              checked={isChecked2}
              onChange={(e) => setIsChecked2(e.target.checked)}
              className="toggle toggle-md border-none text-gray-200 bg-gray-400  checked:bg-red-400 checked:text-red-700"
            />
            </div>
            <div className="flex justify-between mt-3 items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>서비스 이용약관</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>개인정보 처리방침</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>마케팅 및 광고 활용동의</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>위치기반서비스 이용약관</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
            <div role="button" className="flex justify-between mt-3 items-center pt-3 pr-4 pl-4 pb-3 bg-white"
            onClick={()=>handleLogout()}>
                <p>로그아웃</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
            <div className="flex justify-between items-center pt-3 pr-4 pl-4 pb-3 bg-white">
                <p>회원탈퇴</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#666666"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </div>
        </div>
        </motion.div>
      );
}