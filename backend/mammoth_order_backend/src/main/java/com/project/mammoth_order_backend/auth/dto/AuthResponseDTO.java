package com.project.mammoth_order_backend.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDTO {
    @Schema(description = "JWT 토큰", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2OTYyMzgzLCJleHBpcmVkYXRhIjoiMTYxNjk2MjM4MyJ9")
    private String token;

    @Schema(description = "리프레시 토큰", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2OTYyMzgzLCJleHBpcmVkYXRhIjoiMTYxNjk2MjM4MyJ9")
    private String refreshToken;

    @Schema(description = "사용자 정보")
    private UserDTO user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDTO {
        @Schema(description = "사용자 ID", example = "1")
        private Long id;

        @Schema(description = "사용자 이름", example = "홍길동")
        private String name;

        @Schema(description = "사용자 이메일", example = "hong@example.com")
        private String email;

        @Schema(description = "사용자 프로필 이미지 URL", example = "http://k.kakaocdn.net/dn/profile.jpg")
        private String profileImage;

        @Schema(description = "사용자의 포인트", example = "5000")
        private Integer point;
    }
}
