package com.project.mammoth_order_backend.auth.service;

import com.project.mammoth_order_backend.auth.dto.AuthResponseDTO;
import com.project.mammoth_order_backend.auth.dto.KakaoDTO;
import com.project.mammoth_order_backend.auth.entity.User;
import com.project.mammoth_order_backend.auth.repository.UserRepository;
import com.project.mammoth_order_backend.auth.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final KakaoService kakaoService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public AuthResponseDTO kakaoLogin(String code) {
        // 카카오 인가 코드로 액세스 토큰 요청
        KakaoDTO.TokenResponse tokenResponse = kakaoService.getKakaoTokenInfo(code);

        // 액세스 토큰으로 카카오 사용자 정보 요청
        KakaoDTO.KakaoProfile profile = kakaoService.getKakaoProfile(tokenResponse.getAccessToken());

        // 카카오 ID로 사용자 조회 또는 생성
        User user = getUserFromKakaoProfile(profile);

        // JWT 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        // 리프레시 토큰 저장
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        // 응답 DTO 생성
        return createAuthResponse(user, accessToken, refreshToken);
    }

    // 카카오 로그인 시 사용자 정보를 조회하고, 기존 유저가 없을 경우 회원가입
    private User getUserFromKakaoProfile(KakaoDTO.KakaoProfile profile) {
        // 기존 사용자 조회
        Optional<User> existingUser = userRepository.findByKakaoId(profile.getId());

        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // 새 사용자 생성
        User newUser = User.builder()
                .kakaoId(profile.getId())
                .email(profile.getKakaoAccount().getEmail())
                .name(profile.getKakaoAccount().getProfile().getNickname())
                .profileImage(profile.getKakaoAccount().getProfile().getProfileImageUrl())
                .roles(new HashSet<>(Collections.singleton("ROLE_USER")))
                .point(0)
                .build();

        return userRepository.save(newUser);
    }

    // 로그인 또는 회원가입이 완료되었을 때 access token 생성, refresh token 생성, 위 두 토큰과 사용자 정보를 묶어서 클라이언트에 전달
    private AuthResponseDTO createAuthResponse(User user, String accessToken, String refreshToken) {
        return AuthResponseDTO.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .user(AuthResponseDTO.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .profileImage(user.getProfileImage())
                        .build())
                .build();
    }

    @Transactional
    public AuthResponseDTO refreshToken(String refreshToken) {
        // 리프레시 토큰 유효성 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("유효하지 않은 리프레시 토큰입니다.");
        }

        // 토큰에서 이메일 추출
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);

        // 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 저장된 리프레시 토큰과 일치하는지 확인
        if (!user.getRefreshToken().equals(refreshToken)) {
            throw new RuntimeException("리프레시 토큰이 일치하지 않습니다.");
        }

        // 새 액세스 토큰 생성
        String newAccessToken = jwtTokenProvider.createAccessToken(user);

        // 응답 DTO 생성
        return AuthResponseDTO.builder()
                .token(newAccessToken)
                .refreshToken(refreshToken) // 리프레시 토큰은 그대로 유지
                .user(AuthResponseDTO.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .profileImage(user.getProfileImage())
                        .build())
                .build();
    }

    public AuthResponseDTO validateToken(String token) {
        boolean isValid = jwtTokenProvider.validateToken(token);

        if (!isValid) {
            throw new RuntimeException("유효하지 않은 토큰입니다.");
        }

        // 토큰에서 사용자 ID 추출
        Long userId = jwtTokenProvider.getIdFromToken(token);

        // 사용자 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 응답 DTO 생성 (토큰은 그대로 유지, 리프레시 토큰은 포함하지 않음)
        return AuthResponseDTO.builder()
                .token(token)
                .user(AuthResponseDTO.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .profileImage(user.getProfileImage())
                        .build())
                .build();
    }

    public AuthResponseDTO.UserDTO getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        return AuthResponseDTO.UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImage(user.getProfileImage())
                .point(user.getPoint())
                .build();
    }

    /*@Transactional
    public void logout(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // DB에 저장된 리프레시 토큰 삭제 (혹은 null로 설정)
        user.setRefreshToken(null);
        userRepository.save(user);

        //log.info("User with ID {} has logged out.", userId);
    }*/
    @Transactional
    public void logout(String token, Long userId) {
        // 1. 리프레시 토큰 제거
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        user.setRefreshToken(null);
        userRepository.save(user);

        // 2. accessToken을 블랙리스트에 등록
        //long expiration = jwtTokenProvider.getExpiration(token); // 남은 만료 시간 (ms)
        //redisTemplate.opsForValue().set(token, "logout", expiration, TimeUnit.MILLISECONDS);

        //log.info("Access token 블랙리스트 등록 완료");
    }
    /*public void logout(String accessToken) {
        // "Bearer " 접두사 제거
        if (accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.substring(7);
        }

        // 토큰 유효성 검사
        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
        }

        // 토큰 남은 유효 시간(ms)
        long expiration = jwtTokenProvider.getExpiration(accessToken);

        // Redis에 블랙리스트 등록 (key: token, value: "logout")
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public boolean isLogoutToken(String token) {
        return redisTemplate.hasKey(token);
    }*/
}
