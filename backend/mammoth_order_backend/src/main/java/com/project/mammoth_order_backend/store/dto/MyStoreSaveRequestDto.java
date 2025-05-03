package com.project.mammoth_order_backend.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyStoreSaveRequestDto {
    @Schema(description = "매장 ID", example = "1")
    private Long storeId;
}
