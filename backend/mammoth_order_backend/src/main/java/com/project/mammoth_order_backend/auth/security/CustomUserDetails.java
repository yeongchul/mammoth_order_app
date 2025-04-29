package com.project.mammoth_order_backend.auth.security;


import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class CustomUserDetails extends User { // Spring Security에서 사용하는 사용자 인증 객체(UserDetails)를 확장(Customize)
    private final Long id;

    // 로그인한 사용자의 정보(username, password, authorities)에 추가로 id를 포함한 사용자 정보 클래스
    // -> 로그인한 사용자에 대한 추가 정보(id)를 쉽게 다루기 위해 사용
    public CustomUserDetails(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities); // 사용자의 로그인 아이디, 비밀번호, 권한
        this.id = id;
    }
}
