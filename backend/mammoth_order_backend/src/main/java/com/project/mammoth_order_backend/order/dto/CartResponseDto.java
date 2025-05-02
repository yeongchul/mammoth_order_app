package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.enumeration.CupType;
import com.project.mammoth_order_backend.order.enumeration.MilkType;
import com.project.mammoth_order_backend.order.enumeration.Size;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "장바구니 항목에 대한 응답 DTO")
public class CartResponseDto {
    @Schema(description = "장바구니 항목 ID")
    private Long id;

    @Schema(description = "사용자 ID")
    private Long userId;

    @Schema(description = "매장 ID")
    private Long storeId;

    @Schema(description = "매장 이름")
    private String storeName;

    @Schema(description = "메뉴 ID")
    private Long menuId;

    @Schema(description = "메뉴 이름")
    private String menuName;

    @Schema(description = "메뉴 이미지 URL")
    private String menuImage;

    @Schema(description = "주문 수량")
    private Integer menuQuantity;

    @Schema(description = "사이즈에 따라 계산된 메뉴 가격")
    private Integer menuPrice;

    @Schema(description = "컵 종류 (예: 일회용컵, 개인컵, 매장컵)")
    private CupType cupType;

    @Schema(description = "아이스 여부")
    private Boolean isIce;

    @Schema(description = "사이즈 (예: s, m, l)")
    private Size size;

    @Schema(description = "우유 종류 (예: 일반, 저지방, 두유 등)")
    private MilkType milkType;
}
