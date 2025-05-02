package com.project.mammoth_order_backend.admin.service;

import com.project.mammoth_order_backend.admin.dto.MenuUpdateRequestDto;
import com.project.mammoth_order_backend.order.entity.Menu;
import com.project.mammoth_order_backend.order.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final MenuRepository menuRepository;
    
    // 메뉴 수정
    @Transactional
    public void updateMenu(Long menuId, MenuUpdateRequestDto requestDto) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다."));

        menu.update(requestDto.getName(), requestDto.getPrice(), requestDto.getImage(), requestDto.getHasMilk(), requestDto.getMenuType(), requestDto.getIsNewMenu());
    }
    
    // 메뉴 삭제
    public void deleteMenu(Long menuId) {
        menuRepository.deleteById(menuId);
    }
}
