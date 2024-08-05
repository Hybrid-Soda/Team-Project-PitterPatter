package com.pitpat.pitterpatter.domain.game.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.PlayRecord;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GameResultRequestDTO {

    @NotNull(message = "score는 필수 값입니다.")
    private Integer score;
    @NotNull(message = "playtime는 필수 값입니다.")
    private Integer playtime;
    @NotNull(message = "burnedCalorie는 필수 값입니다.")
    private Integer burnedCalorie;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PlayRecord toAddEntity(Child child, GameResultRequestDTO gameResultRequestDTO) {
        return PlayRecord.builder()
                .child(child)
                .score(score)
                .playtime(playtime)
                .burnedCalorie(burnedCalorie)
                .build();
    }
}
