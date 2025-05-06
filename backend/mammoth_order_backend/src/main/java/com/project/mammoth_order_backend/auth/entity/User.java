package com.project.mammoth_order_backend.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    private String profileImage;

    @Column(nullable = false, unique = true)
    private Long kakaoId;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private Set<String> roles = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // 리프레시 토큰 저장용
    private String refreshToken;

    @Column(nullable = false)
    private Integer point;

    public void update(String email, String name, String profileImage, Set<String> roles, LocalDateTime updatedAt, Integer point) {
        this.email = email;
        this.name = name;
        this.profileImage = profileImage;
        this.roles = roles;
        this.updatedAt = updatedAt;
        this.point = point;
    }
}
