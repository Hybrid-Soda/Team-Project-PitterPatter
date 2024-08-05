package com.pitpat.pitterpatter.domain.child.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BMIResponseDTO {
    @NotNull
    private Float bmi;
    @NotNull
    private LocalDateTime updatedAt;

    @Builder
    public BMIResponseDTO(Float bmi, LocalDateTime updatedAt) {
        this.bmi = bmi;
        this.updatedAt = updatedAt;
    }
}
