package com.project.mammoth_order_backend.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "적립된 포인트를 반환하는 DTO")
public class EarnedPointResponseDto {
    @Schema(description = "적립된 포인트", example = "90")
    private Integer earnedPoint;
}
