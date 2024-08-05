package com.pitpat.pitterpatter.domain.user.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.entity.enums.SocialType;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Builder
@Getter
@AllArgsConstructor
@ToString
@Setter
public class UserDto {

    private Integer userId;
    private String twoFa;
    private Boolean isSocial;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String teamName;
    private String email;
    private String password;
    // only social user
    private String serial;
    // only social user
    private SocialType type;

    public static UserDto toDto(UserEntity user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .twoFa(user.getTwoFa())
                .isSocial(user.getIsSocial())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .teamName(user.getTeamName())
                .email(user.getEmail())
                .password(user.getPassword())
                .serial(user.getSerial())
                .type(user.getType())
                .build();
    }

    public UserEntity toEntity() {
        return UserEntity.builder()
                .userId(userId)
                .twoFa(twoFa)
                .isSocial(isSocial)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .teamName(teamName)
                .email(email)
                .password(password)
                .serial(serial)
                .type(type)
                .build();
    }
}
