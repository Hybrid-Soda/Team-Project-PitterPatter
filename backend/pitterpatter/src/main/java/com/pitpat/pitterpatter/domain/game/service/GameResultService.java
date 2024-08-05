package com.pitpat.pitterpatter.domain.game.service;

import com.pitpat.pitterpatter.domain.game.model.dto.GameResultRequestDTO;
import com.pitpat.pitterpatter.entity.PlayRecord;

import java.util.List;

public interface GameResultService {
    boolean addGameResult(Long childId, GameResultRequestDTO gameResultRequestDTO);
    boolean getTodayRecordsByChildId(Long childId);
}
