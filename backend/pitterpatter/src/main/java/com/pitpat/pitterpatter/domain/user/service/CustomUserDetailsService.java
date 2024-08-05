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

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // email로 사용자 엔티티 조회
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        return new CustomUserDetailsDto(UserDto.toDto(user));
    }

}