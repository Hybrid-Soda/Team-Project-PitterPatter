package com.pitpat.pitterpatter.domain.assets.service.pointrecord;

import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.CreatePointRecordDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.FindPointRecordDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.PointRecordSearchCondition;
import com.pitpat.pitterpatter.domain.assets.repository.pointrecord.PointRecordRepository;
import com.pitpat.pitterpatter.entity.PointRecord;
import com.pitpat.pitterpatter.global.exception.exceptions.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PointRecordService {

    private final PointRecordRepository pointRecordRepository;

    // 포인트 레코드 생성
    @Transactional
    public FindPointRecordDto createPointRecord(CreatePointRecordDto createPointRecordDto) {
        PointRecord pointRecord = pointRecordRepository.savePointRecord(createPointRecordDto);
        if (pointRecord == null) {
            throw new EntityNotFoundException("요청한 데이터가 존재하지 않습니다.");
        }
        return new FindPointRecordDto(
                pointRecord.getAmount(),
                pointRecord.getSource(),
                pointRecord.getCreatedAt());
    }

    // 포인트 조회
    public Integer findPointByChild(Long childId) {
        Integer point = pointRecordRepository.findPointByChild(childId);
        if (point == null) {
            throw new EntityNotFoundException("해당 계정은 없는 자녀 계정입니다.");
        }
        return point;
    }

    // 어린이 계정별 포인트 레코드 조회
    public List<FindPointRecordDto> findPointRecordsByChild(Long childId) {
        List<PointRecord> pointRecords = pointRecordRepository.findRecordsByChild(childId);
        if (pointRecords.equals(null)) {
            throw new EntityNotFoundException("요청한 데이터가 존재하지 않습니다.");
        }
        return pointRecords.stream()
                .map(pr ->
                        new FindPointRecordDto(
                                pr.getAmount(),
                                pr.getSource(),
                                pr.getCreatedAt()))
                .collect(Collectors.toList());
    }

    // 여러 검색 조건에 따른 포인트 레코드 조회
    public List<FindPointRecordDto> findPointRecordByConditions(PointRecordSearchCondition condition, Long childId) {
        List<PointRecord> pointRecords = pointRecordRepository.findPointRecordByConditions(condition, childId);
        if (pointRecords.isEmpty()) {
            throw new EntityNotFoundException("만족하는 검색 조건이 없습니다.");
        }
        return pointRecords.stream()
                .map(pr ->
                        new FindPointRecordDto(
                                pr.getAmount(),
                                pr.getSource(),
                                pr.getCreatedAt()))
                .collect(Collectors.toList());
    }


}
