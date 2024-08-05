package com.pitpat.pitterpatter.domain.child.repository;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildResponseDTO;
import com.pitpat.pitterpatter.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    List<ChildResponseDTO> findByUserUserId(Integer userId);
}
