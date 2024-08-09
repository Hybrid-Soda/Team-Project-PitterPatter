package com.pitpat.pitterpatter.domain.user.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pitpat.pitterpatter.domain.user.jwt.JwtTokenProvider;
import com.pitpat.pitterpatter.domain.user.model.dto.JwtTokenDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
@RequiredArgsConstructor
@Slf4j
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("CustomSuccessHandler Call");

        //OAuth2User
        JwtTokenDto tokenDto = jwtTokenProvider.generateToken(authentication);

        // 응답 본문에 JSON 형식으로 TokenDto 객체를 포함시키기 위해 ObjectMapper 사용
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK); // HTTP 200 OK

        // ObjectMapper를 사용하여 TokenDto 객체를 JSON으로 변환하여 응답 본문에 작성
        objectMapper.writeValue(response.getWriter(), tokenDto);
    }

}