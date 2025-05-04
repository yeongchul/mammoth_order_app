package com.project.mammoth_order_backend.auth.controller;

import com.project.mammoth_order_backend.auth.dto.AuthResponseDTO;
import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // 카카오 로그인 콜백 처리 -> 카카오 로그인을 처리하는 컨트롤러 엔드포인트
    @Operation(
            summary = "카카오 로그인 콜백",
            description = "카카오 로그인 인가 코드를 받아 사용자 인증을 처리합니다."
    )
    @PostMapping("/kakao/callback")
    public ResponseEntity<AuthResponseDTO> kakaoCallback(@RequestBody Map<String, String> request) {
        String code = request.get("code");

        // 디버깅을 위한 로그 추가
        log.info("Received authorization code: {}", code);

        AuthResponseDTO response = authService.kakaoLogin(code);
        return ResponseEntity.ok(response);
    }

    // 토큰 갱신
    @Operation(
            summary = "토큰 갱신",
            description = "리프레시 토큰을 사용해 액세스 토큰을 재발급합니다."
    )
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        AuthResponseDTO response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    // 토큰 유효성 검증
    @Operation(
            summary = "토큰 유효성 검증",
            description = "Authorization 헤더의 JWT 토큰이 유효한지 검증합니다."
    )
    @GetMapping("/validate")
    public ResponseEntity<Map<String, Boolean>> validateToken(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.substring(7);
        try {
            authService.validateToken(token);
            return ResponseEntity.ok(Map.of("valid", true));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("valid", false));
        }
    }

    // 현재 사용자 정보 조회
    @Operation(
            summary = "현재 사용자 정보 조회",
            description = "현재 로그인된 사용자의 정보를 반환합니다.\nJWT 토큰을 헤더에 포함해야 합니다."
    )
    @GetMapping("/me")
    public ResponseEntity<AuthResponseDTO.UserDTO> getCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        AuthResponseDTO.UserDTO userDTO = authService.getCurrentUser(userDetails.getId());
        return ResponseEntity.ok(userDTO);
    }

    // 로그아웃
    @Operation(summary = "로그아웃", description = "사용자의 리프레시 토큰을 삭제하고 로그아웃 처리합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, @AuthenticationPrincipal CustomUserDetails userDetails) {
        // 1. Authorization 헤더에서 토큰 추출
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("토큰이 필요합니다.");
        }
        token = token.substring(7);  // "Bearer " 부분 제거

        // 2. 현재 로그인된 사용자의 userId 추출
        Long userId = userDetails.getId();

        // 3. 서비스에 로그아웃 요청
        authService.logout(token, userId);

        return ResponseEntity.ok("로그아웃 되었습니다.");
    }

}
