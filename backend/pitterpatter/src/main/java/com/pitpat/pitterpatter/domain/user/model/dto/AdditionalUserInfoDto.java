package com.pitpat.pitterpatter.domain.user.model.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

// 사용자의 2차 비밀번호와 팀 이름을 담고 있는 DTO
public class AdditionalUserInfoDto {

    private String twoFa;
    private String teamName;
}
