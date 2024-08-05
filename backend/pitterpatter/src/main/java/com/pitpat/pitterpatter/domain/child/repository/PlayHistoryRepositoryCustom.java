package com.pitpat.pitterpatter.domain.child.repository;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRankDTO;

import java.util.List;

public interface PlayHistoryRepositoryCustom {
    List<ChildRankDTO> findRankings(Long childId);
}
