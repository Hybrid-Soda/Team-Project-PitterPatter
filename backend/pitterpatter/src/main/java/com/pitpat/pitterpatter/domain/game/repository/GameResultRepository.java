package com.pitpat.pitterpatter.domain.game.repository;

import com.pitpat.pitterpatter.entity.PlayRecord;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameResultRepository extends JpaRepository<PlayRecord, Long> {
    @Query("SELECT pr FROM PlayRecord pr WHERE pr.child.id = :childId AND DATE(pr.createdAt) = CURRENT_DATE")
    List<PlayRecord> findTodayRecordsByChildId(@Param("childId") Long childId);
}
