package com.project.mammoth_order_backend.order.service;

import com.project.mammoth_order_backend.auth.entity.User;
import com.project.mammoth_order_backend.auth.repository.UserRepository;
import com.project.mammoth_order_backend.order.dto.CartItemDto;
import com.project.mammoth_order_backend.order.dto.CartResponseDto;
import com.project.mammoth_order_backend.order.dto.CartSaveRequestDto;
import com.project.mammoth_order_backend.order.dto.MenuResponseDto;
import com.project.mammoth_order_backend.order.entity.Cart;
import com.project.mammoth_order_backend.order.entity.Menu;
import com.project.mammoth_order_backend.order.enumeration.Size;
import com.project.mammoth_order_backend.order.repository.CartRepository;
import com.project.mammoth_order_backend.order.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    final private MenuRepository menuRepository;
    final private CartRepository cartRepository;
    final private UserRepository userRepository;

    // 전체 메뉴 보기
    @Transactional(readOnly = true)
    public MenuResponseDto getMenu() {
        List<Menu> menuList = menuRepository.findAll();
        return new MenuResponseDto(menuList);
    }

    // 단일 메뉴 보기
    @Transactional(readOnly = true)
    public Menu getMenuById(Long menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));
        return menu;
    }

    // 장바구니 보기
    @Transactional(readOnly = true)
    public List<CartResponseDto> getCartItems(Long userId) {
        List<Cart> cart = cartRepository.findAllByUserId(userId);
        List<CartResponseDto> cartResponseDtoList = new ArrayList<>();

        for (Cart cartItem : cart) {
            int price = menuRepository.findById(cartItem.getMenuId()).get().getPrice();
            if (cartItem.getSize().equals(Size.s)) {
                price = price - 400;
            } else if(cartItem.getSize().equals(Size.l)) {
                price = price + 1400;
            }

            Menu menu = menuRepository.findById(cartItem.getMenuId())
                    .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));

            CartResponseDto dto = CartResponseDto.builder()
                    .id(cartItem.getId())
                    .userId(cartItem.getUserId())
                    .storeId(cartItem.getStoreId())
                    .menuId(cartItem.getMenuId())
                    .menuName(menu.getName())
                    .menuImage(menu.getImage())
                    .menuQuantity(cartItem.getMenuQuantity())
                    .menuPrice(price)
                    .cupType(cartItem.getCupType())
                    .isIce(cartItem.getIsIce())
                    .size(cartItem.getSize())
                    .milkType(cartItem.getMilkType())
                    .build();

            cartResponseDtoList.add(dto);
        }
        return cartResponseDtoList;
    }

    // 장바구니 저장
    @Transactional
    public void addToCart(CartSaveRequestDto cartSaveRequestDto) {
        Cart newCart = Cart.builder()
                .userId(cartSaveRequestDto.getUserId())
                .storeId(cartSaveRequestDto.getStoreId())
                .menuId(cartSaveRequestDto.getMenuId())
                .menuQuantity(cartSaveRequestDto.getMenuQuantity())
                .cupType(cartSaveRequestDto.getCupType())
                .isIce(cartSaveRequestDto.getIsIce())
                .size(cartSaveRequestDto.getSize())
                .milkType(cartSaveRequestDto.getMilkType())
                .build();
        cartRepository.save(newCart);
    }

    // 장바구니 삭제
    @Transactional
    public void removeFromCart(Long cartId) {
        if(cartRepository.existsById(cartId)) {
            cartRepository.deleteById(cartId);
        } else {
            throw new IllegalArgumentException("존재하지 않는 장바구니 항목입니다.");
        }
    }

    // 장바구니 구매
    @Transactional
    public int purchaseCart(List<Long> cartId) {
        // 장바구니 항목 조회
        List<Cart> cartList = cartRepository.findAllById(cartId);
        if (cartList.isEmpty()) {
            throw new IllegalArgumentException("구매할 장바구니 항목이 없습니다.");
        }

        // 사용자 조회
        Long userId = cartList.get(0).getUserId();
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        // 금액 계산
        int total = 0;
        for (Cart cart : cartList) {
            Long menuId = cart.getMenuId();
            int menuQuantity = cart.getMenuQuantity();

            Menu menu = menuRepository.findById(menuId)
                    .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));
            int menuPrice = menu.getPrice();

            total = total + (menuPrice * menuQuantity);
        }
        
        // 포인트 계산
        int earnedPoint = (int)(total * 0.03);
        int newPoint = findUser.getPoint() + earnedPoint;
        userRepository.updateUserPoint(userId, newPoint);
        
        // 장바구니 삭제
        cartRepository.deleteAllById(cartId);

        return earnedPoint;
    }

    // 바로 구매
    @Transactional
    public int buyNow(CartItemDto cartItemDto) {
        // 사용자 조회
        Long userId = cartItemDto.getUserId();
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 포인트 계산
        int earnedPoint = (int)(cartItemDto.getProductPrice() * 0.03);
        int newPoint = findUser.getPoint() + earnedPoint;
        userRepository.updateUserPoint(userId, newPoint);

        return earnedPoint;
    }
}
