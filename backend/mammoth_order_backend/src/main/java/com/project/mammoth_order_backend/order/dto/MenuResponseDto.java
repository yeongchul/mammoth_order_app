package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponseDto {
    private List<Menu> menus;
}
