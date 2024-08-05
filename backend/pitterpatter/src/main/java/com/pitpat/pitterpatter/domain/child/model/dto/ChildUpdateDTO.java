package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.entity.enums.Gender;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Data
@Builder
public class ChildUpdateDTO {
    private String profileImage;

    @Size(max = 10, message = "닉네임은 최대 10자까지 입력 가능합니다.")
    private String nickname;

    private Gender gender;

    private LocalDate birth;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Child toUpdateEntity(Child child, ChildUpdateDTO childUpdateDTO) {
        return Child.builder()
                .id(child.getId())
                .profileImage(Optional.ofNullable(childUpdateDTO.getProfileImage()).orElse(child.getProfileImage()))
                .nickname(Optional.ofNullable(childUpdateDTO.getNickname()).orElse(child.getNickname()))
                .gender(Optional.ofNullable(childUpdateDTO.getGender()).orElse(child.getGender()))
                .birth(Optional.ofNullable(childUpdateDTO.getBirth()).orElse(child.getBirth()))
                .createdAt(child.getCreatedAt())
                .updatedAt(child.getUpdatedAt())
                .personalRecord(child.getPersonalRecord())
                .point(child.getPoint())
                .childItems(child.getChildItems())
                .points(child.getPoints())
                .physicalRecords(child.getPhysicalRecords())
                .playRecords(child.getPlayRecords())
                .user(child.getUser())
                .build();
    }
}
