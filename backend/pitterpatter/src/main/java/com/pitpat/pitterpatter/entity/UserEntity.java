package com.pitpat.pitterpatter.entity;

import com.pitpat.pitterpatter.entity.enums.SocialType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"user\"")
@Getter
@NoArgsConstructor
@Setter
@Builder
@AllArgsConstructor
public class UserEntity {

    @Id
    // MySQL의 Auto Increament와 같은 역할.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "2fa", nullable = false, length = 64)
    private String twoFa;

    @Column(name = "is_social", nullable = false)
    private Boolean isSocial;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @Column(name = "team_name", unique = true, nullable = false, length = 15)
    private String teamName;

    @Column(name = "email", length = 320)
    private String email;

    @Column(name = "pw", length = 64)
    private String password;

    // only social user
    @Column(name = "serial", unique = true, length = 20)
    private String serial;

    // only social user
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private SocialType type;

    // user 테이블:child 테이블 = 1:多 관계
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private final List<Child> children = new ArrayList<>();

    // 엔티티가 생성될 때 createdAt과 updatedAt을 자동으로 갱신
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    // 엔티티가 수정될 때 updatedAt 자동으로 갱신
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}