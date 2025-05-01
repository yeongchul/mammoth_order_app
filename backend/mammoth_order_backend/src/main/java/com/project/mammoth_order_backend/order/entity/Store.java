package com.project.mammoth_order_backend.order.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "store")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;
}
