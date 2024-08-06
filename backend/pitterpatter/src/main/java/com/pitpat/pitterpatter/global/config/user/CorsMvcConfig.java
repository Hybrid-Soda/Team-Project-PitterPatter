package com.pitpat.pitterpatter.global.config.user;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        corsRegistry.addMapping("/**")
                .exposedHeaders("Set-Cookie")
                .allowedOrigins("https://pitter-patter.picel.net",
                        "http://localhost:8080",
                        "http://localhost:5173")
                .allowedMethods("*")
                .allowedHeaders("Authorization", "Content-type") // 모든 헤더 허용
                .exposedHeaders("Set-Cookie") // 응답에서 클라이언트가 접근할 수 있는 헤더
                .allowCredentials(true); // 자격 증명 포함 허용;
    }
}