package com.project.mammoth_order_backend.order.dto;

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
@Schema(description = "포인트 적립을 위한 메뉴 구매 정보 DTO")
public class MenuPurchaseDTO {
    @Schema(description = "메뉴 ID", example = "1")
    private Long menuId;

    @Schema(description = "주문 수량", example = "1")
    private Integer menuQuantity;

    @Schema(description = "사이즈 (예: s, m, l)", example = "m")
    private Size size;
}
