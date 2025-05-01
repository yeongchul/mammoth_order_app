package com.project.mammoth_order_backend.auth.repository;

import com.project.mammoth_order_backend.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByKakaoId(Long kakaoId);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Modifying
    @Query("UPDATE User u SET u.point = :newPoint WHERE u.id = :userId")
    void updateUserPoint(@Param("userId") Long userId, @Param("newPoint") int newPoint);
}
