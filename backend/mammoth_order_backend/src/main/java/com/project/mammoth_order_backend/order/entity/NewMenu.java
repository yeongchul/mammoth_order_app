package com.project.mammoth_order_backend.order.entity;

import com.project.mammoth_order_backend.order.enumeration.MenuType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "new_menu")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NewMenu {
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
    private MenuType menuType;
}
