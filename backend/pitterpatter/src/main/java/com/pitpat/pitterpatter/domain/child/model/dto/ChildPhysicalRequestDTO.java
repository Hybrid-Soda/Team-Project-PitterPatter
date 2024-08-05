package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.PhysicalRecord;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChildPhysicalRequestDTO {

    @NotNull(message = "키는 필수 값입니다.")
    @Min(value = 20, message = "키는 20보다 커야 합니다.")
    @Max(value = 255, message = "키는 255보다 작아야 합니다.")
    private Float height;
    @NotNull(message = "몸무게는 필수 값입니다.")
    @Min(value = 0, message = "몸무게는 0보다 커야 합니다.")
    @Max(value = 255, message = "몸무게는 255보다 작아야 합니다.")
    private Float weight;
    private Float bmi;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PhysicalRecord toAddEntity(Child child, ChildPhysicalRequestDTO childPhysicalRequestDTO, Float caculatedBMI) {
        return PhysicalRecord.builder()
                .child(child)
                .height(childPhysicalRequestDTO.getHeight())
                .weight(childPhysicalRequestDTO.getWeight())
                .bmi(caculatedBMI)
                .build();
    }
}
