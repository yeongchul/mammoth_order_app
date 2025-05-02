package com.project.mammoth_order_backend.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyStoreResponseDto {
    @Schema(description = "MY 매장 고유 ID")
    private Long id;

    @Schema(description = "사용자 ID")
    private Long userId;

    @Schema(description = "매장 ID")
    private Long storeId;

    @Schema(description = "매장 이름")
    private String name;

    @Schema(description = "매장 주소")
    private String address;
}
