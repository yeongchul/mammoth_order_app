package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.enumeration.CupType;
import com.project.mammoth_order_backend.order.enumeration.MilkType;
import com.project.mammoth_order_backend.order.enumeration.Size;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "바로 구매 항목을 보여줄 때 사용하는 요청 DTO")
public class BuyNowResponseDto {
    @Schema(description = "사용자 ID", example = "6")
    private Long userId;

    @Schema(description = "매장 ID", example = "2")
    private Long storeId;

    @Schema(description = "매장 이름", example = "중림한국경제점")
    private String storeName;

    @Schema(description = "메뉴 ID", example = "1")
    private Long menuId;

    @Schema(description = "메뉴 이름", example = "아메리카노")
    private String menuName;

    @Schema(description = "메뉴 이미지 URL")
    private String menuImage;

    @Schema(description = "주문 수량", example = "1")
    private Integer menuQuantity;

    @Schema(description = "사이즈에 따라 계산된 메뉴 가격", example = "1600")
    private Integer menuPrice;

    @Schema(description = "컵 종류 (예: 일회용컵, 개인컵, 매장컵)", example = "disposableCup")
    private CupType cupType;

    @Schema(description = "아이스 여부", example = "true")
    private Boolean isIce;

    @Schema(description = "사이즈 (예: s, m, l)", example = "m")
    private Size size;

    @Schema(description = "우유 종류 (예: 일반, 저지방, 두유 등)", example = "almondBreeze")
    private MilkType milkType;
}
