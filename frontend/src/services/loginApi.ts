import axios from "axios";
import { AuthResponse, User } from "../types/common";
import { API_BASE_URL } from "../contexts/apiContext";

class ApiService {
  private kakaoLoginPromise: Promise<AuthResponse> | null = null;

  // 카카오 로그인 인가 코드로 JWT 토큰 요청
  async kakaoLogin(code: string): Promise<AuthResponse> {
    // 이미 진행 중인 요청이 있다면 해당 Promise를 반환
    if (this.kakaoLoginPromise) {
      return this.kakaoLoginPromise;
    }

    // 새로운 요청 생성
    this.kakaoLoginPromise = axios
      .post(`${API_BASE_URL}/auth/kakao/callback`, { code })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("카카오 로그인 처리 중 오류가 발생했습니다.");
      })
      .finally(() => {
        this.kakaoLoginPromise = null;
      });

    return this.kakaoLoginPromise;
  }

  // JWT 토큰으로 현재 사용자 정보 요청
  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("사용자 정보를 불러오는 중 오류가 발생했습니다.");
    }
  }

  // 토큰 갱신
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw new Error("토큰 갱신 중 오류가 발생했습니다.");
    }
  }

  // 토큰 유효성 검증
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  }
}
export const apiService = new ApiService();
