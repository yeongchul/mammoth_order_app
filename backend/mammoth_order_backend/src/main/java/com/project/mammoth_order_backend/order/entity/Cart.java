package com.project.mammoth_order_backend.order.entity;

import com.project.mammoth_order_backend.auth.entity.User;
import com.project.mammoth_order_backend.order.enumeration.CupType;
import com.project.mammoth_order_backend.order.enumeration.MilkType;
import com.project.mammoth_order_backend.order.enumeration.Size;
import com.project.mammoth_order_backend.store.entity.Store;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_CART_USER"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false, foreignKey = @ForeignKey(name = "FK_CART_STORE"))
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", nullable = false, foreignKey = @ForeignKey(name = "FK_CART_MENU"))
    private Menu menu;

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
    public Cart(User user, Store store, Menu menu, Integer menuQuantity, CupType cupType, Boolean isIce, Size size, MilkType milkType) {
        this.user = user;
        this.store = store;
        this.menu = menu;
        this.menuQuantity = menuQuantity;
        this.cupType = cupType;
        this.isIce = isIce;
        this.size = size;
        this.milkType = milkType;
    }
}
