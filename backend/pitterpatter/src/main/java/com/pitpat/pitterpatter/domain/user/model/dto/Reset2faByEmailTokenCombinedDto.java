package com.pitpat.pitterpatter.domain.user.model.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Builder
public class Reset2faByEmailTokenCombinedDto {

    private TwoFaDto twoFaDto;
    private EmailTokenVerifyDto emailTokenVerifyDto;
}
