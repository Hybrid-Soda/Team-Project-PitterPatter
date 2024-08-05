package com.pitpat.pitterpatter.domain.user.service;

import com.pitpat.pitterpatter.domain.user.model.dto.*;
import com.pitpat.pitterpatter.domain.user.repository.UserRepository;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.entity.enums.SocialType;
import com.pitpat.pitterpatter.global.util.user.TeamNameGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Value("${custom.random-2fa}")
    private String random2Fa;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponseDto(oAuth2User.getAttributes());
        }
        else {
            return null;
        }

        String serial = oAuth2Response.getProvider() + oAuth2Response.getProviderId();
        Optional<UserEntity> existingUser = userRepository.findBySerial(serial);
        UserDto userDto = null;

        // DB에 유저가 존재하지 않는 경우 새로 entity를 만들어서 DB에 저장
        if (!existingUser.isPresent()) {
            userDto = saveUserEntity(oAuth2Response, serial);
        }
        // DB에 유저가 존재하는 경우
        else {
            userDto = UserDto.toDto(existingUser.get());
        }

        return new CustomOAuth2UserDto(userDto);
    }

    private UserDto saveUserEntity(OAuth2Response oAuth2Response, String serial) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        UserEntity userEntity = new UserEntity();

        userEntity.setIsSocial(true);
        // 임시 2차 비밀번호 저장
        userEntity.setTwoFa(passwordEncoder.encode(random2Fa));
        // 임시 팀 이름 저장
        userEntity.setTeamName(getUniqueTeamName());
        userEntity.setSerial(serial);
        userEntity.setType(SocialType.valueOf(oAuth2Response.getProvider().toString()));

        return UserDto.toDto(userRepository.save(userEntity));
    }

    // TODO: UserServiceImpl에도 getUniqueTeamName()이 있으므로 따로 빼서 사용하기
    // 팀 이름 생성기를 이용하여 db에 없는 유니크한 팀 이름 반환
    public String getUniqueTeamName() {
        String teamName = null;
        do {
            teamName = TeamNameGenerator.generateTeamName();
        } while(userRepository.existsByTeamName(teamName));
        return teamName;
    }
}
