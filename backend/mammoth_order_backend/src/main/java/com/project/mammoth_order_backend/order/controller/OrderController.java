package com.project.mammoth_order_backend.order.controller;

import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.order.dto.CartItemDto;
import com.project.mammoth_order_backend.order.dto.MenuResponseDto;
import com.project.mammoth_order_backend.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "메뉴 조회", description = "전체 메뉴 목록을 조회합니다.")
    @GetMapping("/menu")
    public ResponseEntity<MenuResponseDto> getMenu() {
        MenuResponseDto menuResponseDto = orderService.getMenu();
        return ResponseEntity.ok(menuResponseDto);
    }

    // 장바구니 보기
    @Operation(summary = "장바구니 조회", description = "현재 로그인한 사용자의 장바구니 목록을 조회합니다.")
    @GetMapping("/cart")
    public ResponseEntity<List<CartItemDto>> getCart(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        List<CartItemDto> cartItemDtoList = orderService.getCartItems(userId);
        return ResponseEntity.ok(cartItemDtoList);
    }

    // 장바구니 저장
    @Operation(summary = "장바구니에 추가", description = "상품을 장바구니에 추가합니다.")
    @PostMapping("/cart")
    public ResponseEntity<String> addToCart(@RequestBody CartItemDto cartItemDto) {
        orderService.addToCart(cartItemDto);
        return ResponseEntity.ok("장바구니에 저장했습니다.");
    }

    // 장바구니 삭제
    @Operation(summary = "장바구니에서 삭제", description = "장바구니에서 특정 상품을 삭제합니다.")
    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long cartId) {
        orderService.removeFromCart(cartId);
        return ResponseEntity.ok("장바구니에서 삭제하였습니다.");
    }

    // 장바구니 구매 -> 사용자가 수량 바꿨을 때도 적용되게 수정해야 함.
    @Operation(summary = "장바구니 구매", description = "선택된 장바구니 항목을 구매합니다. (수량 반영 예정)")
    @PostMapping("/cart/purchase")
    public ResponseEntity<Integer> purchaseCart(@RequestBody List<Long> cartId) {
        int earnedPoint = orderService.purchaseCart(cartId);
        return ResponseEntity.ok(earnedPoint);
    }

    // 바로 구매
    @Operation(summary = "바로 구매", description = "선택한 상품을 바로 구매합니다.")
    @PostMapping("/buy-now")
    public ResponseEntity<Integer> buyNow(@RequestBody CartItemDto cartItemDto) {
        int earnedPoint = orderService.buyNow(cartItemDto);
        return ResponseEntity.ok(earnedPoint);
    }
}
