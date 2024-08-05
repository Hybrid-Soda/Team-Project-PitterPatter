package com.pitpat.pitterpatter.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash("RefreshToken")
@AllArgsConstructor
@Getter
@Builder
@Setter
@NoArgsConstructor
public class RefreshTokenEntity {
    @Id
    private int userId;
    private String refreshToken;
    
    // @TimeToLive: 자동 삭제 시간
    @TimeToLive
    private Long ttl;
}