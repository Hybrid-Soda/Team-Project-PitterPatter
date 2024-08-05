package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.PhysicalRecord;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Optional;

@Data
@Builder
public class ChildPhysicalUpdateDTO {
    @NotNull(message = "신체정보 ID는 필수 값입니다.")
    private Long id;
    @Min(value = 20, message = "키는 20보다 커야 합니다.")
    @Max(value = 255, message = "키는 255보다 작아야 합니다.")
    private Float height;
    @Min(value = 0, message = "몸무게는 0보다 커야 합니다.")
    @Max(value = 255, message = "몸무게는 255보다 작아야 합니다.")
    private Float weight;
    private Float bmi;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PhysicalRecord toUpdateEntity(ChildPhysicalUpdateDTO childPhysicalUpdateDTO, PhysicalRecord physicalRecord, Float caculatedBMI) {
        return PhysicalRecord.builder()
                .id(childPhysicalUpdateDTO.getId())
                .height(Optional.ofNullable(childPhysicalUpdateDTO.getHeight()).orElse(physicalRecord.getHeight()))
                .weight(Optional.ofNullable(childPhysicalUpdateDTO.getWeight()).orElse(physicalRecord.getWeight()))
                .bmi(caculatedBMI)
                .createdAt(physicalRecord.getCreatedAt())
                .child(physicalRecord.getChild())
                .build();
    }
}
