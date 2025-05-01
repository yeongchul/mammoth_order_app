package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.enumeration.CupType;
import com.project.mammoth_order_backend.order.enumeration.MilkType;
import com.project.mammoth_order_backend.order.enumeration.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartSaveRequestDto {
    private Long id;
    private Long userId;
    private Long storeId;
    private Long menuId;
    private String menuName;
    private String menuImage;
    private Integer menuQuantity;
    private Integer menuPrice;
    private CupType cupType;
    private Boolean isIce;
    private Size size;
    private MilkType milkType;
}
