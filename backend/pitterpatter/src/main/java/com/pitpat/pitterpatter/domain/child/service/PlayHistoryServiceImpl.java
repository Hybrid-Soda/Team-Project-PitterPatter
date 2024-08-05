package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRankDTO;
import com.pitpat.pitterpatter.domain.child.repository.ChildRepository;
import com.pitpat.pitterpatter.domain.child.repository.PlayHistoryRepository;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.PlayRecord;
import com.pitpat.pitterpatter.global.exception.exceptions.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayHistoryServiceImpl implements PlayHistoryService {

    private final PlayHistoryRepository playHistoryRepository;
    private final ChildRepository childRepository;

    @Override
    public List<LocalDate> getCurrentMonthPlayData(Long childId) {
        validateChildExists(childId);
        List<LocalDateTime> playDates = playHistoryRepository.findPlayDatesForCurrentMonth(childId);
        validateNotEmptyList(playDates);
        return playDates.stream()
                .map(LocalDateTime::toLocalDate)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<ChildRankDTO> getRanking(Long childId) {
        validateChildExists(childId);
        List<ChildRankDTO> rankings = playHistoryRepository.findRankings(childId);
        validateNotEmptyList(rankings);
        return rankings;
    }

    private <T> void validateNotEmptyList(List<T> list) {
        if(list.isEmpty()) {
            throw new DataNotFoundException("해당 데이터가 존재하지 않습니다.(리스트의 길이가 0)");
        }
    }

    // 해당 ID의 자녀가 존재하는지 검증
    private Child validateChildExists(Long childId) {
        return childRepository.findById(childId)
                .orElseThrow(() -> new DataNotFoundException("해당 자녀가 존재하지 않습니다."));
    }
}
