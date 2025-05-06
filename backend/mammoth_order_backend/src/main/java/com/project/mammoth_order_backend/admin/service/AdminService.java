package com.project.mammoth_order_backend.admin.service;

import com.project.mammoth_order_backend.admin.dto.MenuUpdateRequestDto;
import com.project.mammoth_order_backend.admin.dto.UserUpdateRequestDto;
import com.project.mammoth_order_backend.auth.entity.User;
import com.project.mammoth_order_backend.auth.repository.UserRepository;
import com.project.mammoth_order_backend.order.entity.Menu;
import com.project.mammoth_order_backend.order.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final MenuRepository menuRepository;

    // 사용자 조회
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    // 단일 사용자 조회
    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        User foundUser = userRepository.findById(userId)
                .orElseThrow(() ->  new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return foundUser;
    }

    // 회원 정보 수정
    public void updateUser(Long userId, UserUpdateRequestDto requestDto) {
        User foundUser = userRepository.findById(userId)
                .orElseThrow(() ->  new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        LocalDateTime updatedAt = LocalDateTime.now();
        foundUser.update(requestDto.getEmail(), requestDto.getName(), requestDto.getProfileImage(), requestDto.getRoles(), updatedAt, requestDto.getPoint());
        userRepository.save(foundUser);
    }

    // 회원 삭제
    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
    
    // 메뉴 수정
    @Transactional
    public void updateMenu(Long menuId, MenuUpdateRequestDto requestDto) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));

        menu.update(requestDto.getName(), requestDto.getPrice(), requestDto.getImage(), requestDto.getHasMilk(), requestDto.getMenuType(), requestDto.getIsNewMenu());
        menuRepository.save(menu);
    }
    
    // 메뉴 삭제
    @Transactional
    public void deleteMenu(Long menuId) {
        menuRepository.deleteById(menuId);
    }
}
