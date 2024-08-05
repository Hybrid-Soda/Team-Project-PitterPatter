package com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindPointRecordDto {
    private int amount;
    private String source;
    private LocalDateTime createdAt;

    public FindPointRecordDto(int amount, String source, LocalDateTime createdAt) {
        this.amount = amount;
        this.source = source;
        this.createdAt = createdAt;
    }
}
