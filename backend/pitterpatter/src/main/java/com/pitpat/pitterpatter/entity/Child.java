package com.pitpat.pitterpatter.entity;

import com.pitpat.pitterpatter.entity.enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "child")
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "child_id")
    private Long id;

    // TODO: user_id FK 필요.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "profile_image")
    private String profileImage;

    @NotNull
    private String nickname;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Gender gender;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @NotNull
    private LocalDate birth;

    @Column(name = "personal_record")
    private int personalRecord = 0;

    private int point = 0;

    @OneToMany(mappedBy = "child", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ChildItem> childItems = new ArrayList<>();

    @OneToMany(mappedBy = "child", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PointRecord> points = new ArrayList<>();

    @OneToMany(mappedBy = "child", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PhysicalRecord> physicalRecords = new ArrayList<>();

    @OneToMany(mappedBy = "child", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayRecord> playRecords = new ArrayList<>();

    public void addPoint(int amount) {
        if (amount > 0 && point > Integer.MAX_VALUE - amount) {
            point = Integer.MAX_VALUE;
        } else {
            point += amount;
        }
    }

    @Builder
    public Child(Long id, String profileImage, UserEntity user, String nickname, Gender gender, LocalDateTime createdAt, LocalDate birth, int personalRecord, int point, List<ChildItem> childItems, List<PointRecord> points, List<PhysicalRecord> physicalRecords, List<PlayRecord> playRecords) {
        this.id = id;
        this.profileImage = profileImage;
        this.user = user;
        this.nickname = nickname;
        this.gender = gender;
        this.createdAt = createdAt;
        this.birth = birth;
        this.personalRecord = personalRecord;
        this.point = point;
        this.childItems = childItems != null ? childItems : new ArrayList<>();
        this.points = points != null ? points : new ArrayList<>();
        this.physicalRecords = physicalRecords != null ? physicalRecords : new ArrayList<>();
        this.playRecords = playRecords != null ? playRecords : new ArrayList<>();
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
