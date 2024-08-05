package com.pitpat.pitterpatter.domain.child.repository;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRankDTO;
import com.pitpat.pitterpatter.entity.PlayRecord;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PlayHistoryRepository extends JpaRepository<PlayRecord, Long>, PlayHistoryRepositoryCustom {
    @Query("SELECT DISTINCT pr.createdAt FROM PlayRecord pr WHERE pr.child.id = :childId AND MONTH(pr.createdAt) = MONTH(CURRENT_DATE) AND YEAR(pr.createdAt) = YEAR(CURRENT_DATE)")
    List<LocalDateTime> findPlayDatesForCurrentMonth(@Param("childId") Long childId);
}
