package com.project.mammoth_order_backend.order.controller;

import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.order.dto.CartItemDto;
import com.project.mammoth_order_backend.order.dto.CartResponseDto;
import com.project.mammoth_order_backend.order.dto.CartSaveRequestDto;
import com.project.mammoth_order_backend.order.dto.MenuResponseDto;
import com.project.mammoth_order_backend.order.entity.Menu;
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
    @GetMapping("/menus")
    public ResponseEntity<MenuResponseDto> getAllMenus() {
        MenuResponseDto menuResponseDto = orderService.getAllMenus();
        return ResponseEntity.ok(menuResponseDto);
    }

    // 단일 메뉴 보기
    @Operation(summary = "단일 메뉴 조회", description = "단일 메뉴 목록을 조회합니다.")
    @GetMapping("/menus/{menuId}")
    public ResponseEntity<Menu> getMenuById(@PathVariable("menuId") Long menuId) {
        Menu findMenu = orderService.findMenuById(menuId);
        return ResponseEntity.ok(findMenu);
    }

    // 장바구니 조회
    @Operation(summary = "장바구니 조회", description = "현재 로그인한 사용자의 장바구니 목록을 조회합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @GetMapping("/cart")
    public ResponseEntity<List<CartResponseDto>> getUserCartItems(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        List<CartResponseDto> cartResponseDtoList = orderService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(cartResponseDtoList);
    }

    // 장바구니 추가
    @Operation(summary = "장바구니에 추가", description = "상품을 장바구니에 추가합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @PostMapping("/cart/items")
    public ResponseEntity<String> addCartItem(@RequestBody CartSaveRequestDto cartSaveRequestDto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        orderService.saveCartItem(cartSaveRequestDto, userId);
        return ResponseEntity.ok("장바구니에 저장했습니다.");
    }

    // 장바구니 삭제
    @Operation(summary = "장바구니에서 삭제", description = "장바구니에서 특정 상품을 삭제합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @DeleteMapping("/cart/items/{cartId}")
    public ResponseEntity<String> deleteCartItemByIdAndUser(@PathVariable Long cartId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        orderService.deleteCartItemByIdAndUser(cartId, userId);
        return ResponseEntity.ok("장바구니에서 삭제하였습니다.");
    }

    // 장바구니 구매
    @Operation(summary = "장바구니 구매", description = "선택된 장바구니 항목을 구매합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @PostMapping("/cart/purchase")
    public ResponseEntity<Integer> purchaseCartItems(@RequestBody List<Long> cartId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        int earnedPoint = orderService.processCartPurchase(cartId, userId);
        return ResponseEntity.ok(earnedPoint);
    }

    // 바로 구매 세션에 저장
    /*@PostMapping("/buy")
    public ResponseEntity<Void> buy(@RequestBody CartSaveRequestDto cartSaveRequestDto, HttpSession httpSession) {

    }*/
    
    // 바로 구매 보기

    // 바로 구매 포인트 적립
    @Operation(summary = "바로 구매", description = "선택한 상품을 바로 구매합니다.")
    @PostMapping("/buy-now")
    public ResponseEntity<Integer> buyNow(@RequestBody CartItemDto cartItemDto) {
        int earnedPoint = orderService.buyNow(cartItemDto);
        return ResponseEntity.ok(earnedPoint);
    }
}
