package com.pitpat.pitterpatter.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "physical_record")
public class PhysicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "physical_record_id")
    private Long id;

    private Float height;

    private Float weight;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private Float bmi;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private Child child;

    @Builder
    public PhysicalRecord(Long id, Float height, Float weight, LocalDateTime createdAt, Float bmi, Child child) {
      this.id = id;
      this.height = height;
      this.weight = weight;
      this.createdAt = createdAt;
      this.bmi = bmi;
      this.child = child;
    }

    @PrePersist
    @PreUpdate
    private void trimNanoSeconds() {
      if (createdAt != null) {
        createdAt = createdAt.withNano(0);
      }
      if (updatedAt != null) {
        updatedAt = updatedAt.withNano(0);
      }
    }
}
