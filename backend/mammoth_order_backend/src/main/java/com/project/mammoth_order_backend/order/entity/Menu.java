package com.project.mammoth_order_backend.order.entity;

import com.project.mammoth_order_backend.order.enumeration.MenuType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "menu")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private Boolean hasMilk;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MenuType menuType;

    @Column(nullable = false)
    private Boolean isNewMenu = false;

    public void update(String name, Integer price, String image, Boolean hasMilk, MenuType menuType, Boolean isNewMenu) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.hasMilk = hasMilk;
        this.menuType = menuType;
        this.isNewMenu = isNewMenu;
    }
}
