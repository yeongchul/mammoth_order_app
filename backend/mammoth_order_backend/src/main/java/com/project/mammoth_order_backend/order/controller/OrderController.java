package com.project.mammoth_order_backend.order.controller;

import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.order.dto.CartItemDto;
import com.project.mammoth_order_backend.order.dto.MenuResponseDto;
import com.project.mammoth_order_backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    // 메뉴 전체 보기
    @GetMapping("/menu")
    public ResponseEntity<MenuResponseDto> getMenu() {
        MenuResponseDto menuResponseDto = orderService.getMenu();
        return ResponseEntity.ok(menuResponseDto);
    }

    // 장바구니 보기
    @GetMapping("/cart")
    public ResponseEntity<List<CartItemDto>> getCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        List<CartItemDto> cartItemDtoList = orderService.getCartItems(userId);
        return ResponseEntity.ok(cartItemDtoList);
    }

    // 장바구니 저장
    @PostMapping("/cart")
    public ResponseEntity<String> addToCart(@RequestBody CartItemDto cartItemDto) {
        orderService.addToCart(cartItemDto);
        return ResponseEntity.ok("장바구니에 저장했습니다.");
    }

    // 장바구니 삭제
    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long cartId) {
        orderService.removeFromCart(cartId);
        return ResponseEntity.ok("장바구니에서 삭제하였습니다.");
    }

    // 장바구니 구매 -> 사용자가 수량 바꿨을 때도 적용되게 수정해야 함.
    @PostMapping("/cart/purchase")
    public ResponseEntity<Integer> purchaseCart(@RequestBody List<Long> cartId) {
        int earnedPoint = orderService.purchaseCart(cartId);
        return ResponseEntity.ok(earnedPoint);
    }

    // 바로 구매
    @PostMapping("/buy-now")
    public ResponseEntity<Integer> buyNow(@RequestBody CartItemDto cartItemDto) {
        int earnedPoint = orderService.buyNow(cartItemDto);
        return ResponseEntity.ok(earnedPoint);
    }
}
