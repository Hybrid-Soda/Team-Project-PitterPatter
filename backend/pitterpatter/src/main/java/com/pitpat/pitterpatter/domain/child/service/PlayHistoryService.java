package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRankDTO;
import com.pitpat.pitterpatter.entity.PlayRecord;

import java.time.LocalDate;
import java.util.List;

public interface PlayHistoryService {
    List<LocalDate> getCurrentMonthPlayData(Long childId);

    List<ChildRankDTO> getRanking(Long childId);
}
