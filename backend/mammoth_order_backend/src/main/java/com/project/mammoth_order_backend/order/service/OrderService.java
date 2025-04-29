package com.project.mammoth_order_backend.order.service;

import com.project.mammoth_order_backend.order.domain.Menu;
import com.project.mammoth_order_backend.order.domain.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    final private MenuRepository menuRepository;

    public List<Menu> findAllMenu() {
        return menuRepository.findAll();
    }
}
