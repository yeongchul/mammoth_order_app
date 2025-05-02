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
import com.project.mammoth_order_backend.store.repository.StoreRepository;
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
    final private StoreRepository storeRepository;

    // 전체 메뉴 보기
    @Transactional(readOnly = true)
    public MenuResponseDto getAllMenus() {
        List<Menu> menus = menuRepository.findAll();
        return new MenuResponseDto(menus);
    }

    // 단일 메뉴 보기
    @Transactional(readOnly = true)
    public Menu findMenuById(Long menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));
        return menu;
    }

    // 장바구니 조회
    @Transactional(readOnly = true)
    public List<CartResponseDto> getCartItemsByUserId(Long userId) {
        List<Cart> cartList = cartRepository.findAllByUserId(userId);
        List<CartResponseDto> cartResponses = new ArrayList<>();

        for (Cart cart : cartList) {
            Menu menu = menuRepository.findById(cart.getMenuId())
                    .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));

            int menuPrice = calculateMenuPriceWithSize(menu.getPrice(), cart.getSize());

            CartResponseDto cartResponse = CartResponseDto.builder()
                    .id(cart.getId())
                    .userId(userId)
                    .storeId(cart.getStoreId())
                    .storeName(storeRepository.findById(cart.getStoreId()).get().getName())
                    .menuId(cart.getMenuId())
                    .menuName(menu.getName())
                    .menuImage(menu.getImage())
                    .menuQuantity(cart.getMenuQuantity())
                    .menuPrice(menuPrice * cart.getMenuQuantity())
                    .cupType(cart.getCupType())
                    .isIce(cart.getIsIce())
                    .size(cart.getSize())
                    .milkType(cart.getMilkType())
                    .build();

            cartResponses.add(cartResponse);
        }
        return cartResponses;
    }

    // 장바구니 추가
    @Transactional
    public void saveCartItem(CartSaveRequestDto cartSaveRequestDto, Long userId) {
        Cart cart = Cart.builder()
                .userId(userId)
                .storeId(cartSaveRequestDto.getStoreId())
                .menuId(cartSaveRequestDto.getMenuId())
                .menuQuantity(cartSaveRequestDto.getMenuQuantity())
                .cupType(cartSaveRequestDto.getCupType())
                .isIce(cartSaveRequestDto.getIsIce())
                .size(cartSaveRequestDto.getSize())
                .milkType(cartSaveRequestDto.getMilkType())
                .build();
        cartRepository.save(cart);
    }

    // 장바구니 삭제
    @Transactional
    public void deleteCartItemByIdAndUser(Long cartId, Long userId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 장바구니 항목입니다."));

        if(!cart.getUserId().equals(userId)) {
            throw new IllegalArgumentException("이 장바구니 항목은 해당 사용자에게 속하지 않습니다.");
        }

        cartRepository.deleteById(cartId);
    }

    // 장바구니 구매
    @Transactional
    public int processCartPurchase(List<Long> cartId, Long userId) {
        // 장바구니 항목 조회
        List<Cart> cartList = cartRepository.findAllById(cartId);
        if (cartList.isEmpty()) {
            throw new IllegalArgumentException("구매할 장바구니 항목이 없습니다.");
        }

        // 사용자 확인
        if(!cartList.get(0).getUserId().equals(userId)) {
            throw new IllegalArgumentException("이 장바구니 항목은 해당 사용자에게 속하지 않습니다.");
        }
        
        // 금액 계산
        int total = 0;
        for (Cart cart : cartList) {
            Long menuId = cart.getMenuId();
            int menuQuantity = cart.getMenuQuantity();

            Menu menu = menuRepository.findById(menuId)
                    .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));

            int menuPrice = calculateMenuPriceWithSize(menu.getPrice(), cart.getSize());

            total = total + (menuPrice * menuQuantity);
        }
        
        // 포인트 계산
        int earnedPoint = (int)(total * 0.03);
        int newPoint = userRepository.findById(userId).get().getPoint() + earnedPoint;
        userRepository.updateUserPoint(userId, newPoint);
        
        // 장바구니 삭제
        cartRepository.deleteAllById(cartId);

        return earnedPoint;
    }

    private int calculateMenuPriceWithSize(int basePrice, Size size) {
        switch (size) {
            case s:
                return basePrice - 400;
            case l:
                return basePrice + 1400;
            default:
                return basePrice;
        }
    }

    // 바로 구매
    @Transactional
    public int buyNow(CartItemDto cartItemDto) {
        // 사용자 조회
        Long userId = cartItemDto.getUserId();
        User foundUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 포인트 계산
        int earnedPoint = (int)(cartItemDto.getProductPrice() * 0.03);
        int newPoint = foundUser.getPoint() + earnedPoint;
        userRepository.updateUserPoint(userId, newPoint);

        return earnedPoint;
    }
}
