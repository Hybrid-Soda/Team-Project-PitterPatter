package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChildPlayInfoResponseDTO {

    @NotNull
    private LocalDate createdAt;

    @NotNull
    private Long playtime;

    @Builder
    public ChildPlayInfoResponseDTO(LocalDate createdAt, Long playtime) {
        this.createdAt = createdAt;
        this.playtime = playtime;
    }
}
