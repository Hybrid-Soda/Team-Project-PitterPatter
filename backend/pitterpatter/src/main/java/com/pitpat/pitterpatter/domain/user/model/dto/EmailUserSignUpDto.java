package com.pitpat.pitterpatter.domain.user.model.dto;

import com.pitpat.pitterpatter.entity.UserEntity;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor
public class EmailUserSignUpDto {

    private final Boolean isSocial = false;
    private String email;
    private String password;

    // 생성자
    @Builder
    public EmailUserSignUpDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UserEntity toEntity(String encodedPassword) {
        return UserEntity.builder()
                .isSocial(isSocial)
                .email(email)
                .password(encodedPassword)
                .build();
    }
}
