package com.pitpat.pitterpatter.domain.user.model.dto;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2UserDto implements OAuth2User {

    private final UserDto userDto;

    // kakao, naver 등 소셜 로그인 response 구조가 각각 다르므로 해당 메서드는 사용 x
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 빈 리스트 반환 (USER, ADMIN과 같은 권한 체계 없음)
        return Collections.emptyList();
    }

    @Override
    public String getName() {
        // name 대신 userId 반환
        return String.valueOf(userDto.getUserId());
    }
}
