package com.project.mammoth_order_backend.order.controller;

import com.project.mammoth_order_backend.auth.entity.User;
import com.project.mammoth_order_backend.auth.repository.UserRepository;
import com.project.mammoth_order_backend.order.domain.Menu;
import com.project.mammoth_order_backend.order.domain.MenuRepository;
import com.project.mammoth_order_backend.order.dto.CartItemDTO;
import com.project.mammoth_order_backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final MenuRepository menuRepository;
    private final OrderService orderService;
    private final UserRepository userRepository;

    // 메뉴 전체 반환
    @GetMapping("/findAll")
    public ResponseEntity<List<Menu>> findAllMenu() {
        List<Menu> menus = orderService.findAllMenu();
        return ResponseEntity.ok(menus);
    }

    // 장바구니 저장
    List<CartItemDTO> cart = new ArrayList<>();
    @PostMapping("/cart")
    public ResponseEntity<String> addCart(@RequestBody CartItemDTO cartItemDTO) {
        cart.add(cartItemDTO);
        return ResponseEntity.ok("장바구니에 저장");
    }
    
    //장바구니 삭제
    @PostMapping("/cart")
    public ResponseEntity<String> delCart(@RequestBody CartItemDTO cartItemDTO) {
        cart.add(cartItemDTO);
        return ResponseEntity.ok("장바구니에 삭제");
    }

    // 장바구니 반환
    @GetMapping("/cart/{userId}")
    public ResponseEntity<List<CartItemDTO>> showCart(@PathVariable Long userId) {
        List<CartItemDTO> userCart = cart.stream().filter(item -> item.getUserId().equals(userId)).collect(Collectors.toList());
        return ResponseEntity.ok(cart);
    }

    // 바로 구매
    @PostMapping("/buy") // 3% 포인트
    public ResponseEntity<String> buy(@RequestBody CartItemDTO cartItemDTO) {
        Optional<User> user = userRepository.findById(cartItemDTO.getUserId());
        //int point = user.get().getPoint();
        //point = point + (cartItemDTO.getProductPrice() * cartItemDTO.getProductQuantity()) * 0.03;
        //user.get().setPoint(point);
        return ResponseEntity.ok("구매 성공");
    }
}
