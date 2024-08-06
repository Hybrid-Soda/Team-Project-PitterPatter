package com.pitpat.pitterpatter.entity;


import com.pitpat.pitterpatter.domain.child.model.dto.ChildRankDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@Table(name = "play_record")
@SqlResultSetMapping(
        name = "ChildRankMapping",
        classes = @ConstructorResult(
                targetClass = ChildRankDTO.class,
                columns = {
                        @ColumnResult(name = "childId", type = Long.class),
                        @ColumnResult(name = "profile_image", type=String.class),
                        @ColumnResult(name = "nickname", type=String.class),
                        @ColumnResult(name = "maxScore", type = Integer.class),
                        @ColumnResult(name = "ranking", type = Integer.class)
                }
        )
)
public class PlayRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "play_record_id")
    private Long id;

    private int score;

    @CreatedDate
    private LocalDateTime createdAt;

    private int playtime;

    private int burnedCalorie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private Child child;

    @Builder
    public PlayRecord(Long id, int score, LocalDateTime createdAt, int playtime, int burnedCalorie, Child child) {
        this.id = id;
        this.score = score;
        this.createdAt = createdAt;
        this.playtime = playtime;
        this.burnedCalorie = burnedCalorie;
        this.child = child;
    }

    @PrePersist
    @PreUpdate
    private void trimNanoSeconds() {
        if (createdAt != null) {
            createdAt = createdAt.withNano(0);
        }
    }
}
