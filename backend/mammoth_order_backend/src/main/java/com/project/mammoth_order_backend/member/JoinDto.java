package com.project.mammoth_order_backend.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JoinDto {
    private String uid;
    private String password;
    private String name;
}
