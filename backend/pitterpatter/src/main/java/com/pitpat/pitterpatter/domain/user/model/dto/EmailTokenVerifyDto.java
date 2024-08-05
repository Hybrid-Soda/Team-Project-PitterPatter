package com.pitpat.pitterpatter.domain.user.model.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@ToString
@Getter
@AllArgsConstructor
public class EmailTokenVerifyDto {
    private String email;
    private String emailToken;
}
