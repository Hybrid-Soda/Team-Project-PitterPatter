package com.pitpat.pitterpatter.domain.assets.repository.pointrecord;

import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.CreatePointRecordDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.PointRecordSearchCondition;
import com.pitpat.pitterpatter.entity.PointRecord;

import java.util.List;

public interface PointRecordRepositoryCustom {

    Integer findPointByChild(Long childId);

    List<PointRecord> findPointRecordByConditions(PointRecordSearchCondition condition, Long childId);

    PointRecord savePointRecord(CreatePointRecordDto createPointRecordDto);
}
