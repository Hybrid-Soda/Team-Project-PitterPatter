package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.*;
import com.pitpat.pitterpatter.domain.child.repository.ChildPhysicalRepository;
import com.pitpat.pitterpatter.domain.child.repository.ChildRepository;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.PhysicalRecord;
import com.pitpat.pitterpatter.global.exception.exceptions.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildPhysicalServiceImpl implements ChildPhysicalService{

    private final ChildRepository childRepository;
    private final ChildPhysicalRepository childPhysicalRepository;

    @Override
    public ChildPhysicalResponseDTO getLatestPhysicalRecord(Long childId) {
        // 자녀 존재여부 검증
        validateChildExists(childId);

        ChildPhysicalResponseDTO childPhysicalResponseDTO = childPhysicalRepository.findTopByChildIdOrderByUpdatedAtDesc(childId)
                .map(childPhysical -> ChildPhysicalResponseDTO.builder()
                        .id(childPhysical.getId())
                        .height(childPhysical.getHeight())
                        .weight(childPhysical.getWeight())
                        .bmi(childPhysical.getBmi())
                        .createdAt(childPhysical.getCreatedAt())
                        .updatedAt(childPhysical.getUpdatedAt())
                        .build())
                .orElseThrow(() -> new DataNotFoundException("자녀의 신체정보가 존재하지 않습니다."));

        return childPhysicalResponseDTO;
    }

    @Override
    public void addPhysicalRecord(Long childId, ChildPhysicalRequestDTO childPhysicalRequestDTO) {
        // 자녀 존재여부 검증 후 존재한다면 Child 할당
        Child child = validateChildExists(childId);

        // 키, 몸무게 기준으로 BMI 계산
        Float caculatedBMI = calculateBMI(childPhysicalRequestDTO.getHeight(), childPhysicalRequestDTO.getWeight());

        PhysicalRecord physicalRecord = childPhysicalRequestDTO.toAddEntity(child, childPhysicalRequestDTO, caculatedBMI);
        childPhysicalRepository.save(physicalRecord);
    }

    @Override
    public void updateChild(Long childId, ChildPhysicalUpdateDTO childPhysicalUpdateDTO) {
        // 자녀 존재여부 검증
        validateChildExists(childId);

        PhysicalRecord physicalRecord = childPhysicalRepository.findById(childPhysicalUpdateDTO.getId())
                .orElseThrow(() -> new DataNotFoundException("신체정보 테이블이 존재하지 않습니다."));

        // 키와 몸무게 업데이트(수정 사항이 아니라면, 기존 데이터 할당)
        Float newHeight = Optional.ofNullable(childPhysicalUpdateDTO.getHeight()).orElse(physicalRecord.getHeight());
        Float newWeight = Optional.ofNullable(childPhysicalUpdateDTO.getWeight()).orElse(physicalRecord.getWeight());

        // BMI 계산
        Float caculatedBMI = calculateBMI(newHeight, newWeight);

        PhysicalRecord updatePhysicalRecord = childPhysicalUpdateDTO.toUpdateEntity(childPhysicalUpdateDTO, physicalRecord, caculatedBMI);
        childPhysicalRepository.save(updatePhysicalRecord);
    }

    @Override
    public List<BMIResponseDTO> getBMIHistory(Long childId, LocalDateTime start, LocalDateTime end) {

        validateChildExists(childId);

        List<PhysicalRecord> physicalRecords = childPhysicalRepository.findPhysicalRecordsByDateRangeWithFetchJoin(childId, start, end);
        validateNotEmptyList(physicalRecords);
        List<BMIResponseDTO> result = convertPhysicalRecordToBMIResponseDTO(physicalRecords);
        return result;
    }

    @Override
    public List<ChildPhysicalResponseDTO> getPhysicalRecordListByChildId(Long childId) {
        validateChildExists(childId);
        List<PhysicalRecord> physicalRecordList = childPhysicalRepository.findByChildId(childId);
        validateNotEmptyList(physicalRecordList);
        return ChildPhysicalResponseDTO.fromEntityList(physicalRecordList);
    }

    private static List<BMIResponseDTO> convertPhysicalRecordToBMIResponseDTO(List<PhysicalRecord> physicalRecords) {
        List<BMIResponseDTO> result = new ArrayList<>();
        physicalRecords.forEach(pr -> {
            result.add(BMIResponseDTO.builder()
                    .bmi(pr.getBmi())
                    .updatedAt(pr.getUpdatedAt())
                    .build());
        });
        return result;
    }

    // BMI 계산
    private Float calculateBMI(Float height, Float weight) {
        if (height <= 0 || weight <= 0) {
            throw new IllegalArgumentException("키 또는 몸무게가 음수입니다.");
        }
        Float caculatedBMI = weight / (height * height);
        caculatedBMI *= 10000;
        caculatedBMI = Math.round(caculatedBMI * 100) / 100.0f;
        return caculatedBMI;
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