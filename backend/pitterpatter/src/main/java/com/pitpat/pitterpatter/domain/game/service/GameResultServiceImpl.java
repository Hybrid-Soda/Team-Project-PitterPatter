package com.pitpat.pitterpatter.domain.game.service;

import com.pitpat.pitterpatter.domain.child.repository.ChildRepository;
import com.pitpat.pitterpatter.domain.game.model.dto.GameResultRequestDTO;
import com.pitpat.pitterpatter.domain.game.repository.GameResultRepository;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.PlayRecord;
import com.pitpat.pitterpatter.global.exception.exceptions.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameResultServiceImpl implements GameResultService{

    private final ChildRepository childRepository;
    private final GameResultRepository gameResultRepository;

    @Override
    public boolean addGameResult(Long childId, GameResultRequestDTO gameResultRequestDTO) {
        // 자녀 존재여부 검증 후 존재한다면 Child 할당
        Child child = validateChildExists(childId);

        // 해당 유저의 금일 최초 플레이인지 여부 확인
        boolean isFirstPlayToday = getTodayRecordsByChildId(childId);

        PlayRecord playRecord = gameResultRequestDTO.toAddEntity(child, gameResultRequestDTO);
        gameResultRepository.save(playRecord);

        return isFirstPlayToday;
    }

    @Override
    public boolean getTodayRecordsByChildId(Long childId) {
        List<PlayRecord> todayRecordsByChildId = gameResultRepository.findTodayRecordsByChildId(childId);
        if(todayRecordsByChildId.isEmpty()){
            return true;
        } else {
            return false;
        }
    }

    // 해당 ID의 자녀가 존재하는지 검증
    private Child validateChildExists(Long childId) {
        return childRepository.findById(childId)
                .orElseThrow(() -> new DataNotFoundException("해당 자녀가 존재하지 않습니다."));
    }
}
