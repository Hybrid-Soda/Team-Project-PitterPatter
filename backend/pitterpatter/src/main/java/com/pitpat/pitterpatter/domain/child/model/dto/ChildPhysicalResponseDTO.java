package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.PhysicalRecord;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ChildPhysicalResponseDTO {

    @NotNull
    private Long id;
    private Float height;
    private Float weight;
    private Float bmi;
    @NotNull
    private LocalDateTime createdAt;
    @NotNull
    private LocalDateTime updatedAt;

    @Builder
    public ChildPhysicalResponseDTO(Long id, Float height, Float weight, Float bmi, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ChildPhysicalResponseDTO fromEntity(PhysicalRecord record) {
        return ChildPhysicalResponseDTO.builder()
                .id(record.getId())
                .height(record.getHeight())
                .weight(record.getWeight())
                .bmi(record.getBmi())
                .createdAt(record.getCreatedAt())
                .updatedAt(record.getUpdatedAt())
                .build();
    }

    public static List<ChildPhysicalResponseDTO> fromEntityList(List<PhysicalRecord> records) {
        return records.stream()
                .map(ChildPhysicalResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
