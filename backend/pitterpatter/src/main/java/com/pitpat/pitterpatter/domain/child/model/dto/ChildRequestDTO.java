package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.entity.enums.Gender;
import com.pitpat.pitterpatter.global.validation.ValidLocalDate;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChildRequestDTO {

    private String profileImage;

    @NotNull(message = "닉네임은 필수 값입니다.")
    @Size(max = 10, message = "닉네임은 최대 10자까지 입력 가능합니다.")
    private String nickname;

    @NotNull(message = "성별은 필수 값입니다.")
    private Gender gender;

    @NotNull(message = "생일은 필수 값입니다.")
    @ValidLocalDate
    private String birth;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Child toAddEntity(UserEntity user) {
        return Child.builder()
                .profileImage(profileImage)
                .user(user)
                .nickname(nickname)
                .gender(gender)
                .birth(LocalDate.parse(birth))
                .build();
    }

    public Child toAddEntity(UserEntity user, ChildRequestDTO childRequestDTO) {
        return Child.builder()
                .profileImage(childRequestDTO.getProfileImage())
                .user(user)
                .nickname(childRequestDTO.getNickname())
                .gender(childRequestDTO.getGender())
                .birth(LocalDate.parse(childRequestDTO.getBirth()))
                .build();
    }

    public Child toUpdateEntity(Child child, ChildRequestDTO childRequestDTO) {
        return Child.builder()
                .id(child.getId())
                .profileImage(Optional.ofNullable(childRequestDTO.getProfileImage()).orElse(child.getProfileImage()))
                .nickname(Optional.ofNullable(childRequestDTO.getNickname()).orElse(child.getNickname()))
                .gender(Optional.ofNullable(childRequestDTO.getGender()).orElse(child.getGender()))
                .birth(Optional.ofNullable(childRequestDTO.getBirth()).map(LocalDate::parse).orElse(child.getBirth()))
                .createdAt(child.getCreatedAt())
                .build();
    }
}