package com.pitpat.pitterpatter.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class PointRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_record_id")
    private Long id;

    private int amount;

    private String source;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private Child child;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public PointRecord(int amount, String source, Child child) {
        this.amount = amount;
        this.source = source;
        this.child = child;
    }
}
