package com.project.mammoth_order_backend.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyStoreResponseDto {
    private Long id;
    private Long userId;
    private Long storeId;
    private String storeName;
    private String storeAddress;
}
