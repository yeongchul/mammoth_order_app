package com.project.mammoth_order_backend.admin.dto;

import com.project.mammoth_order_backend.order.enumeration.MenuType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuUpdateRequestDto {
    private Long id;
    private String name;
    private Integer price;
    private String image;
    private Boolean hasMilk;
    private MenuType menuType;
    private Boolean isNewMenu;
}
