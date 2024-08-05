package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.UserEntity;

import java.util.List;
import java.util.stream.Collectors;

public class DtoConverter {

//    public static ChildDTO toChildDTO(Child child) {
//        return ChildDTO.builder()
//                .id(child.getId())
//                .profileImage(child.getProfileImage())
//                .nickname(child.getNickname())
//                .gender(child.getGender())
//                .birth(child.getBirth())
//                .personalRecord(child.getPersonalRecord())
//                .point(child.getPoint())
//                .createdAt(child.getCreatedAt())
//                .updatedAt(child.getUpdatedAt())
//                .build();
//    }
//
//    public static UserDTO toUserDTO(UserEntity user) {
//        return UserDTO.builder()
//                .userId(user.getUserId())
//                .twoFa(user.getTwoFa())
//                .isSocial(user.getIsSocial())
//                .createdAt(user.getCreatedAt())
//                .updatedAt(user.getUpdatedAt())
//                .teamName(user.getTeamName())
//                .email(user.getEmail())
//                .password(user.getPassword())
//                .salt(user.getSalt())
//                .serial(user.getSerial())
//                .type(user.getType())
//                .children(user.getChildren().stream().map(DtoConverter::toChildDTO).collect(Collectors.toList()))
//                .build();
//    }
}



