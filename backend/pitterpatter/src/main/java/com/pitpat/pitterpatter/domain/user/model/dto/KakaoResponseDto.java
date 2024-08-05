package com.pitpat.pitterpatter.domain.user.model.dto;

import java.util.Map;

public class KakaoResponseDto implements OAuth2Response {

    private final Map<String, Object> attribute;

    public KakaoResponseDto(Map<String, Object> attribute) {
        this.attribute = attribute;
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        // 카카오의 response에서 id는 회원번호를 나타낸다.
        return attribute.get("id").toString();
    }
}
