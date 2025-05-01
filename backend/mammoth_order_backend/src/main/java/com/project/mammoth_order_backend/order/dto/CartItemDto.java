package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.entity.Cart;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "장바구니 항목 DTO")
public class CartItemDto {
    @Schema(description = "장바구니 항목 ID", example = "101")
    private Long id;

    @Schema(description = "사용자 ID", example = "1")
    private Long userId;

    @Schema(description = "매장 ID", example = "10")
    private Long storeId;

    @Schema(description = "매장 이름", example = "매머드 커피 서울역점")
    private String storeName;

    @Schema(description = "상품(메뉴) ID", example = "1001")
    private Long productId;

    @Schema(description = "상품(메뉴) 이름", example = "아메리카노")
    private String productName;

    @Schema(description = "상품 가격", example = "2500")
    private Integer productPrice;

    @Schema(description = "상품 수량", example = "2")
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
