package com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PointRecordSearchCondition {
    private Integer amount;
    private String source;
    private LocalDateTime createdDate;
}

