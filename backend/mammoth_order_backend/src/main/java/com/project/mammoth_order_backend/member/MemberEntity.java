package com.project.mammoth_order_backend.member;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uid;
    private String password;
    private String name;
    private Integer point;

    @Builder
    public MemberEntity(String uid, String password, String name, Integer point) {
        this.uid = uid;
        this.password = password;
        this.name = name;
        this.point = point;
    }
}
