package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {
    private Long id;
    private Long userId;
    private Long storeId;
    private String storeName;
    private Long productId;
    private String productName;
    private Integer productPrice;
    private Integer productQuantity;

    // dto -> entity
    public Cart toEntity() {
        return Cart.builder()
                .userId(userId)
                .storeId(storeId)
                .menuId(productId)
                .menuQuantity(productQuantity)
                .build();
    }
}
