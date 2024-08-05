package com.pitpat.pitterpatter.domain.child.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChildRankDTO {
    private Long childId;
    private int maxScore;
    private int ranking;
}
