package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildMaxScoreDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildPlayInfoResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildScoreResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.DailyScoreSumDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ChildPlayInfoService {
    List<ChildPlayInfoResponseDTO> getPlayTimeByDateRange(Long childId, LocalDateTime startDate, LocalDateTime endDate);

    ChildMaxScoreDTO getMaxScore(Long childId);

    ChildScoreResponseDTO getChildScoreInfo(Long childId, LocalDateTime start, LocalDateTime end);

    List<DailyScoreSumDTO> getDailyScoreSum(Long childId, LocalDateTime startDate, LocalDateTime endDate);
}
