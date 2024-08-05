package com.pitpat.pitterpatter.domain.child.model.dto;

import com.pitpat.pitterpatter.entity.enums.SocialType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserDTO {
    private Integer userId;
    private String twoFa;
    private Boolean isSocial;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String teamName;
    private String email;
    private String password;
    private String salt;
    private String serial;
    private SocialType type;
    private List<ChildResponseDTO> children;
}
