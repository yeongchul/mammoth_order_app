package com.project.mammoth_order_backend.order.service;

import com.project.mammoth_order_backend.auth.repository.UserRepository;
import com.project.mammoth_order_backend.order.dto.CartItemDto;
import com.project.mammoth_order_backend.order.entity.Cart;
import com.project.mammoth_order_backend.order.repository.CartRepository;
import com.project.mammoth_order_backend.order.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    final private MenuRepository menuRepository;
    final private CartRepository cartRepository;
    final private UserRepository userRepository;

    // 장바구니 보기
    public List<CartItemDto> getCartItems(Long userId) {
        return cartRepository.findCartItemDto(userId);
    }

    // 장바구니 저장
    public void addToCart(CartItemDto cartItemDto) {
        Cart cart = cartItemDto.toEntity();
        cartRepository.save(cart);
    }

    // 장바구니 삭제
    public void removeFromCart(Long cartId) {
        if(cartRepository.existsById(cartId)) {
            cartRepository.deleteById(cartId);
        } else {
            throw new IllegalArgumentException("존재하지 않는 장바구니 항목입니다.");
        }
    }

    // 장바구니 구매
    /*public void purchaseCart(List<Long> cartId) {
        List<Cart> findCart = cartRepository.findAllById(cartId);
        Long findUserId = findCart.get().getUserId();
        Optional<User> findUser = userRepository.findById(findUserId);
        int point = findUser.get().getPoint();
        //point = point +
        cartRepository.deleteAllById(cartId);
    }*/

    // 바로 구매

    //public List<Menu> findAllMenu() {
        //return menuRepository.findAll();
    //}
}
