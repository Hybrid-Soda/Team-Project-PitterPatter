package com.pitpat.pitterpatter.domain.user.repository;

import com.pitpat.pitterpatter.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.twoFa = :twoFa WHERE u.userId = :userId")
    int updateTwoFa(@Param("userId") Integer userId, @Param("twoFa") String twoFa);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.teamName = :teamName WHERE u.userId = :userId")
    int updateTeamName(@Param("userId") Integer userId, @Param("teamName") String teamName);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.password = :password WHERE u.userId = :userId")
    int updatePassword(@Param("userId") Integer userId, @Param("password") String password);
}
