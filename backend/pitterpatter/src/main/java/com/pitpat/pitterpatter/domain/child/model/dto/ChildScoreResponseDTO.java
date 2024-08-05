package com.pitpat.pitterpatter.domain.child.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class ChildScoreResponseDTO {

    private ChildMaxScoreDTO maxScore;
    private List<DailyScoreSumDTO> dailyScoreSum;

    @Builder
    public ChildScoreResponseDTO(ChildMaxScoreDTO maxScore, List<DailyScoreSumDTO> dailyScoreSum) {
        this.maxScore = maxScore;
        this.dailyScoreSum = dailyScoreSum;
    }
}
