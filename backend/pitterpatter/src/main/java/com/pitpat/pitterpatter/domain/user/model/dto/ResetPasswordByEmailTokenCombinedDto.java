package com.pitpat.pitterpatter.domain.user.model.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Builder
public class ResetPasswordByEmailTokenCombinedDto {

    private PasswordDto passwordDto;
    private EmailTokenVerifyDto emailTokenVerifyDto;
}
