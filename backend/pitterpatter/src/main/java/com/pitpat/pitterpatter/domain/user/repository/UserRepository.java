package com.pitpat.pitterpatter.domain.user.repository;

import com.pitpat.pitterpatter.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // =================== 로그인 관련 ======================
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findBySerial(String serial);

    // ================== 회원가입 관련 ====================
    boolean existsByEmail(String email);
    boolean existsByTeamName(String teamName);

    // ====================== 조회, 변경, 탈퇴 ==========================
    Optional<UserEntity> findByUserId(int userId);
//    Optional<UserEntity> findByEmail(String email);
}
