package com.project.mammoth_order_backend.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyStoreResponseDto {
    @Schema(description = "MY 매장 고유 ID", example = "1")
    private Long id;

    @Schema(description = "사용자 ID", example = "6")
    private Long userId;

    @Schema(description = "매장 ID", example = "2")
    private Long storeId;

    @Schema(description = "매장 이름", example = "중림한국경제점")
    private String name;

    @Schema(description = "매장 주소", example = "서울시 중구 청파로 641, 1층(중림동)")
    private String address;
}
