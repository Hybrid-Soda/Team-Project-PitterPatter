package com.pitpat.pitterpatter.domain.child.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DailyScoreSumDTO {
    @NotNull
    private LocalDate createdAt;

    @NotNull
    private Long score;

    @Builder
    public DailyScoreSumDTO(LocalDate createdAt, Long score) {
        this.createdAt = createdAt;
        this.score = score;
    }
}
