package com.project.mammoth_order_backend.order.controller;

import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.order.dto.CartItemDto;
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

    // 장바구니 구매
    /*@PostMapping("/cart/purchase")
    public ResponseEntity<String> purchaseCart(@RequestBody List<Long> cartId) {
        orderService.purchaseCart(cartId);
    }*/

    // 바로 구매
    /*
    private final OrderService orderService;
    private final UserRepository userRepository;

    // 메뉴 전체 반환
    @GetMapping("/findAll")
    public ResponseEntity<List<Menu>> findAllMenu() {
        List<Menu> menus = orderService.findAllMenu();
        return ResponseEntity.ok(menus);
    }

    // 바로 구매
    @PostMapping("/buy") // 3% 포인트
    public ResponseEntity<String> buy(@RequestBody CartItemDTO cartItemDTO) {
        Optional<User> user = userRepository.findById(cartItemDTO.getUserId());
        //int point = user.get().getPoint();
        //point = point + (cartItemDTO.getProductPrice() * cartItemDTO.getProductQuantity()) * 0.03;
        //user.get().setPoint(point);
        return ResponseEntity.ok("구매 성공");
    }*/
}
