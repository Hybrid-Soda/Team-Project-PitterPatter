package com.pitpat.pitterpatter.domain.user.repository;

import com.pitpat.pitterpatter.entity.EmailTokenEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailTokenRepository extends CrudRepository<EmailTokenEntity, String> {
    Optional<EmailTokenEntity> findByEmail(String email);
}