package com.project.mammoth_order_backend.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private Long userId;
    private Long storeId;
    private String productName;
    private Integer productPrice;
    private Integer productQuantity;
}
