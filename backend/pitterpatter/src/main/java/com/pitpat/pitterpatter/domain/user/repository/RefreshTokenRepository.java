package com.pitpat.pitterpatter.domain.user.repository;

import com.pitpat.pitterpatter.entity.RefreshTokenEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshTokenEntity, String> {
    Optional<RefreshTokenEntity> findByUserId(String userId);
}