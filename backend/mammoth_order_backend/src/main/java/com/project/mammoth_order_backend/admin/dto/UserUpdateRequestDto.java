package com.project.mammoth_order_backend.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDto {
    private String email;
    private String name;
    private String profileImage;
    private Set<String> roles = new HashSet<>();
    private Integer point;
}
