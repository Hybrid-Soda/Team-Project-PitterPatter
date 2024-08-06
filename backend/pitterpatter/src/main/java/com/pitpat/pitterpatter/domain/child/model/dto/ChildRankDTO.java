package com.pitpat.pitterpatter.domain.child.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChildRankDTO {
    private Long childId;
    private String profileImage;
    private String nickname;
    private int maxScore;
    private int ranking;
}
