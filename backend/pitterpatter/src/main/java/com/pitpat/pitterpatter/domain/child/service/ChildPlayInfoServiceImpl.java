package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildMaxScoreDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildPlayInfoResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildScoreResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.DailyScoreSumDTO;
import com.pitpat.pitterpatter.domain.child.repository.ChildPlayInfoRepository;
import com.pitpat.pitterpatter.domain.child.repository.ChildRepository;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.PlayRecord;
import com.pitpat.pitterpatter.global.exception.exceptions.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildPlayInfoServiceImpl implements ChildPlayInfoService {

    private final ChildPlayInfoRepository childPlayInfoRepository;
    private final ChildRepository childRepository;

    @Override
    public List<ChildPlayInfoResponseDTO> getPlayTimeByDateRange(Long childId, LocalDateTime startDate, LocalDateTime endDate) {
        validateChildExists(childId);
        List<PlayRecord> playRecords = getPlayRecordsByDateRange(childId, startDate, endDate);
        List<ChildPlayInfoResponseDTO> childPlayInfoResponseDTOList = convertPlayRecordToChildPlayInfoResponseDTO(playRecords);

        return childPlayInfoResponseDTOList;
    }

    @Override
    public ChildScoreResponseDTO getChildScoreInfo(Long childId, LocalDateTime start, LocalDateTime end) {
        validateChildExists(childId);

        ChildMaxScoreDTO maxScore = getMaxScore(childId);
        List<DailyScoreSumDTO> dailyScoreSumDTOList = getDailyScoreSum(childId, start, end);

        return ChildScoreResponseDTO.builder()
                .maxScore(maxScore)
                .dailyScoreSum(dailyScoreSumDTOList)
                .build();
    }

    @Override
    public ChildMaxScoreDTO getMaxScore(Long childId) {
        Pageable pageable = PageRequest.of(0, 1);
        List<PlayRecord> playRecordList = childPlayInfoRepository.findTopByChildIdOrderByScoreDesc(childId, pageable);

        validateNotEmptyList(playRecordList);

        PlayRecord playRecord = playRecordList.get(0);

        return ChildMaxScoreDTO.builder()
                .createdAt(playRecord.getCreatedAt())
                .score(playRecord.getScore())
                .build();
    }

    @Override
    public List<DailyScoreSumDTO> getDailyScoreSum(Long childId, LocalDateTime startDate, LocalDateTime endDate) {
        List<PlayRecord> playRecords = getPlayRecordsByDateRange(childId, startDate, endDate);
        List<DailyScoreSumDTO> dailyScoreSumDTOList = convertPlayRecordToDailyScoreSumDTO(playRecords);

        return dailyScoreSumDTOList;
    }

    private List<PlayRecord> getPlayRecordsByDateRange(Long childId, LocalDateTime startDate, LocalDateTime endDate) {
        List<PlayRecord> playRecords = childPlayInfoRepository.findPlayRecordsByDateRangeWithFetchJoin(childId, startDate, endDate);
        validateNotEmptyList(playRecords);
        return playRecords;
    }

    private List<DailyScoreSumDTO> convertPlayRecordToDailyScoreSumDTO(List<PlayRecord> playRecords) {
        List<DailyScoreSumDTO> result = playRecords.stream()
                .collect(Collectors.groupingBy(pr -> pr.getCreatedAt().toLocalDate(), Collectors.summingLong(PlayRecord::getScore)))
                .entrySet().stream()
                .map(entry -> new DailyScoreSumDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        // 레포지토리에서 역순으로 리턴해주기 때문에, List를 뒤집어서 반환(날짜순 정렬)
        Collections.reverse(result);
        return result;
    }

    private List<ChildPlayInfoResponseDTO> convertPlayRecordToChildPlayInfoResponseDTO(List<PlayRecord> playRecords) {
        List<ChildPlayInfoResponseDTO> result = playRecords.stream()
                .collect(Collectors.groupingBy(pr -> pr.getCreatedAt().toLocalDate(), Collectors.summingLong(PlayRecord::getPlaytime)))
                .entrySet().stream()
                .map(entry -> new ChildPlayInfoResponseDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        // 레포지토리에서 역순으로 리턴해주기 때문에, List를 뒤집어서 반환(날짜순 정렬)
        Collections.reverse(result);
        return result;
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