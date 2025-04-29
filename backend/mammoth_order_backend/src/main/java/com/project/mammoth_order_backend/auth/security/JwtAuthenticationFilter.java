package com.project.mammoth_order_backend.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // 로그인했는지 검사하고, 로그인한 사용자라면 세팅해주는 필터
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = resolveToken(request); // 토큰 추출

        if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) { // 토큰 검증
            Authentication authentication = jwtTokenProvider.getAuthentication(token); // 인증 객체 생성(토큰을 바탕으로 사용자 인증 정보 Authentication 객체 생성)
            SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext에 저장(로그인 상태를 서버 안에 기억하도록 설정)
            log.debug("토큰 인증 정보를 저장했습니다, URI: {}", request.getRequestURI());
        } else {
            log.debug("유효한 JWT 토큰이 없습니다, URI: {}", request.getRequestURI());
        }

        filterChain.doFilter(request, response); // 다음 필터(혹은 컨트롤러)로 넘기기
    }

    // 사용자 요청에서 JWT 토큰을 꺼내기
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
