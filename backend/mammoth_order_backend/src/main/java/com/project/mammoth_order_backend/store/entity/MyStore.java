package com.project.mammoth_order_backend.store.entity;

import com.project.mammoth_order_backend.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "my_store")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyStore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User 엔티티와의 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_MYSTORE_USER"))
    private User user;

    // Store 엔티티와의 관계 설정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false, foreignKey = @ForeignKey(name = "FK_MYSTORE_STORE"))
    private Store store;

    @Builder
    public MyStore(User user, Store store) {
        this.user = user;
        this.store = store;
    }
}
