package com.project.mammoth_order_backend.order.entity;

import com.project.mammoth_order_backend.order.enumeration.CupType;
import com.project.mammoth_order_backend.order.enumeration.MilkType;
import com.project.mammoth_order_backend.order.enumeration.Size;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long storeId;

    @Column(nullable = false)
    private Long menuId;

    @Column(nullable = false)
    private Integer menuQuantity;

    @Enumerated(EnumType.STRING)
    private CupType cupType;

    private Boolean isIce;

    @Enumerated(EnumType.STRING)
    private Size size;

    @Enumerated(EnumType.STRING)
    private MilkType milkType;

    @Builder
    public Cart(Long userId, Long storeId, Long menuId, Integer menuQuantity, CupType cupType, Boolean isIce, Size size, MilkType milkType) {
        this.userId = userId;
        this.storeId = storeId;
        this.menuId = menuId;
        this.menuQuantity = menuQuantity;
        this.cupType = cupType;
        this.isIce = isIce;
        this.size = size;
        this.milkType = milkType;
    }
}
