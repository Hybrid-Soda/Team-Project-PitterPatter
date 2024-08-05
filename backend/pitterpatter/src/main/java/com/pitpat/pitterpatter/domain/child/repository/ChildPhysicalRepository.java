package com.pitpat.pitterpatter.domain.child.repository;

import com.pitpat.pitterpatter.entity.PhysicalRecord;
import com.pitpat.pitterpatter.entity.PlayRecord;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChildPhysicalRepository extends JpaRepository<PhysicalRecord, Long> {
    Optional<PhysicalRecord> findTopByChildIdOrderByUpdatedAtDesc(Long childId);

    @Query("SELECT pr FROM PhysicalRecord pr JOIN FETCH pr.child c WHERE c.id = :childId AND pr.createdAt BETWEEN :startDate AND :endDate ORDER BY pr.updatedAt")
    List<PhysicalRecord> findPhysicalRecordsByDateRangeWithFetchJoin(@Param("childId") Long childId,
                                                             @Param("startDate") LocalDateTime startDate,
                                                             @Param("endDate") LocalDateTime endDate);

    @Query("SELECT pr FROM PhysicalRecord pr WHERE pr.child.id = :childId")
    List<PhysicalRecord> findByChildId(@Param("childId") Long childId);
}
