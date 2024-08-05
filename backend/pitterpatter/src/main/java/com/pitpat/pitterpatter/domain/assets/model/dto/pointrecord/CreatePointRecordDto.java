package com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreatePointRecordDto {
    @NotNull
    private int amount;
    @NotNull
    private String source;
    @NotNull
    private Long childId;

    public CreatePointRecordDto(int amount, String source, Long childId) {
        this.amount = amount;
        this.source = source;
        this.childId = childId;
    }
}
