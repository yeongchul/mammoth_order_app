package com.project.mammoth_order_backend.store.entity;

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

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long storeId;

    @Builder
    public MyStore(Long userId, Long storeId) {
        this.userId = userId;
        this.storeId = storeId;
    }
}
