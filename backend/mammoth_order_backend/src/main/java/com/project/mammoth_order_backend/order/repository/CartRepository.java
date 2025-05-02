package com.project.mammoth_order_backend.order.repository;

import com.project.mammoth_order_backend.order.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    /*@Query("SELECT new com.project.mammoth_order_backend.order.dto.CartResponseDto(" +
            "c.id," +
            "c.userId, " +
            "c.storeId, " +
            "s.name, " +
            "c.menuId, " +
            "m.name, " +
            "(m.price * c.menuQuantity), " +
            "c.menuQuantity) " +
            "FROM Cart c " +
            "JOIN Menu m ON c.menuId = m.id " +
            "JOIN Store s ON c.storeId = s.id " +
            "WHERE c.userId = :userId")
    List<CartItemDto> findCartResponseDto(@Param("userId") Long userId);*/

    List<Cart> findAllByUserId(Long userId);
}
