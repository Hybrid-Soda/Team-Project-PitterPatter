package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.*;
import com.pitpat.pitterpatter.entity.PhysicalRecord;

import java.time.LocalDateTime;
import java.util.List;

public interface ChildPhysicalService {
    ChildPhysicalResponseDTO getLatestPhysicalRecord(Long childId);

    void addPhysicalRecord(Long childId, ChildPhysicalRequestDTO childPhysicalRequestDTO);

    void updateChild(Long childId, ChildPhysicalUpdateDTO childPhysicalUpdateDTO);

    List<BMIResponseDTO> getBMIHistory(Long childId, LocalDateTime start, LocalDateTime end);

    List<ChildPhysicalResponseDTO> getPhysicalRecordListByChildId(Long childId);
}
