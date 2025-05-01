package com.project.mammoth_order_backend.order.repository;

import com.project.mammoth_order_backend.order.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    // 메뉴 이름으로 메뉴 조회
    Optional<Menu> findByName(String menuName);
}
