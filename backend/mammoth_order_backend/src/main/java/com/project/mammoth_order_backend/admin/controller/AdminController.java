package com.project.mammoth_order_backend.admin.controller;

import com.project.mammoth_order_backend.admin.dto.MenuUpdateRequestDto;
import com.project.mammoth_order_backend.admin.service.AdminService;
import com.project.mammoth_order_backend.order.dto.MenuResponseDto;
import com.project.mammoth_order_backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin/menus")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final OrderService orderService;

    // 전체 메뉴 보기
    @GetMapping
    public String menuList(Model model) {
        MenuResponseDto menus = orderService.getMenu();
        model.addAttribute("menus", menus);
        return "menu-list";
    }

    // 단일 메뉴 보기

    // 상품 수정
    @PostMapping("/update/{menuId}")
    public String updateMenu(@PathVariable Long menuId, @ModelAttribute MenuUpdateRequestDto requestDto) {
        adminService.updateMenu(menuId, requestDto);
        return "redirect:/menus";
    }
    
    //상품 삭제
    @PostMapping("/delete/{menuId}")
    public String deleteMenu(@PathVariable Long menuId) {
        adminService.deleteMenu(menuId);
        return "redirect:/admin/menus";
    }
}
