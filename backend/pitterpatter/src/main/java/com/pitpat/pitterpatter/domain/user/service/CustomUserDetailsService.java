package com.pitpat.pitterpatter.domain.user.service;

import com.pitpat.pitterpatter.domain.user.model.dto.CustomUserDetailsDto;
import com.pitpat.pitterpatter.domain.user.model.dto.UserDto;
import com.pitpat.pitterpatter.domain.user.repository.UserRepository;
import com.pitpat.pitterpatter.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // email로 사용자 엔티티 조회
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> existingUserOptional = userRepository.findByEmail(username);

        if (existingUserOptional.isEmpty()) {
            log.error("UsernameNotFoundException: [loadUserByUserName] 해당 email을 가진 사용자가 존재하지 않습니다: {}", username);
            throw new UsernameNotFoundException("해당 사용자가 존재하지 않습니다.");
        }

        UserEntity user = existingUserOptional.get();
        return new CustomUserDetailsDto(UserDto.toDto(user));
    }

}