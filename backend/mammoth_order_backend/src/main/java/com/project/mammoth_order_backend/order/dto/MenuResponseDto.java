package com.project.mammoth_order_backend.order.dto;

import com.project.mammoth_order_backend.order.entity.Menu;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "메뉴 전체 응답 DTO")
public class MenuResponseDto {
    @ArraySchema(schema = @Schema(implementation = Menu.class),
                 arraySchema = @Schema(description = "메뉴 목록"))
    private List<Menu> menus;
}
