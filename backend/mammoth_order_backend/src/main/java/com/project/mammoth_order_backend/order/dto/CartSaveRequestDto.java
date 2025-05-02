package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.enumeration.CupType;
import com.project.mammoth_order_backend.order.enumeration.MilkType;
import com.project.mammoth_order_backend.order.enumeration.Size;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "장바구니에 항목을 추가할 때 사용하는 요청 DTO")
public class CartSaveRequestDto {
    @Schema(description = "사용자 ID", example = "1")
    private Long userId;

    @Schema(description = "매장 ID", example = "1")
    private Long storeId;

    @Schema(description = "메뉴 ID", example = "10")
    private Long menuId;

    @Schema(description = "메뉴 수량", example = "2")
    private Integer menuQuantity;

    @Schema(description = "컵 종류 (예: disposableCup, personalCup, storeCup)", example = "disposableCup")
    private CupType cupType;

    @Schema(description = "아이스 여부", example = "true")
    private Boolean isIce;

    @Schema(description = "사이즈 (예: s, m, l)", example = "m")
    private Size size;

    @Schema(description = "우유 종류 (예: milk, lowFatMilk, soyMilk, almondBreeze, oatSide)", example = "milk")
    private MilkType milkType;
}
