package com.pitpat.pitterpatter.domain.child.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChildMaxScoreDTO {

    @NotNull
    private LocalDateTime createdAt;

    @NotNull
    private int score;

    @Builder
    public ChildMaxScoreDTO(LocalDateTime createdAt, int score) {
        this.createdAt = createdAt;
        this.score = score;
    }
}
