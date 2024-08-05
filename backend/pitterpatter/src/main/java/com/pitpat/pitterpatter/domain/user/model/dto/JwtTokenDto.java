package com.pitpat.pitterpatter.domain.user.model.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@ToString
@Getter
@AllArgsConstructor
public class JwtTokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}