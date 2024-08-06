package com.pitpat.pitterpatter.domain.user.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;

public class CustomFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        // 실패 처리 로직
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("Authentication failed: " + exception.getMessage());
    }
}