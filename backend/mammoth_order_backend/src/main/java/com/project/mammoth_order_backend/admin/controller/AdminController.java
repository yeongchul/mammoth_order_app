package com.project.mammoth_order_backend.admin.controller;

import com.project.mammoth_order_backend.admin.dto.MenuUpdateRequestDto;
import com.project.mammoth_order_backend.admin.dto.UserUpdateRequestDto;
import com.project.mammoth_order_backend.admin.service.AdminService;
import com.project.mammoth_order_backend.auth.entity.User;
import com.project.mammoth_order_backend.order.dto.MenuResponseDto;
import com.project.mammoth_order_backend.order.entity.Menu;
import com.project.mammoth_order_backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final OrderService orderService;

    // 전체 회원 조회
    @GetMapping("/member")
    public String getAllUsers(Model model) {
        List<User> users = adminService.getAllUsers();
        model.addAttribute("users", users);
        return "user-list";
    }

    // 단일 회원 조회
    @GetMapping("/member/{id}")
    public String getUserById(@PathVariable("id") Long userId, Model model) {
        User user = adminService.getUserById(userId);
        model.addAttribute("user", user);
        return "user-edit";
    }

    // 회원 정보 수정
    @PostMapping("/member/update/{id}")
    public String updateUser(@PathVariable("id") Long userId, @ModelAttribute UserUpdateRequestDto userUpdateRequestDto) {
        adminService.updateUser(userId, userUpdateRequestDto);
        return "redirect:/admin/member";
    }

    // 회원 삭제
    @PostMapping("/member/delete/{id}")
    public String deleteUser(@PathVariable("id") Long userId) {
        adminService.deleteUser(userId);
        return "redirect:/admin/member";
    }

    // 전체 메뉴 보기
    @GetMapping("/menus")
    public String menuList(Model model) {
        MenuResponseDto menus = orderService.getAllMenus();
        model.addAttribute("menus", menus);
        return "menu-list";
    }

    // 단일 메뉴 보기
    @GetMapping("/menus/{id}")
    public String getMenuById(@PathVariable("id") Long menuId, Model model) {
        Menu menu = orderService.findMenuById(menuId);
        model.addAttribute("menu", menu);
        return "menu-edit";
    }

    // 상품 수정
    @PostMapping("/menus/update/{id}")
    public String updateMenu(@PathVariable("id") Long menuId, @ModelAttribute MenuUpdateRequestDto requestDto) {
        adminService.updateMenu(menuId, requestDto);
        return "redirect:/admin/menus";
    }
    
    //상품 삭제
    @PostMapping("/menus/delete/{id}")
    public String deleteMenu(@PathVariable("id") Long menuId) {
        adminService.deleteMenu(menuId);
        return "redirect:/admin/menus";
    }
}
