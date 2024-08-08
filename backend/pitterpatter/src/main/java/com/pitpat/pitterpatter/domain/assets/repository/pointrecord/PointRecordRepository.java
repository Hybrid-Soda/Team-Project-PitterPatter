package com.pitpat.pitterpatter.domain.assets.repository.pointrecord;

import com.pitpat.pitterpatter.entity.PointRecord;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PointRecordRepository extends JpaRepository<PointRecord, Long>, PointRecordRepositoryCustom {
    @Query("SELECT p FROM PointRecord p WHERE p.child.id = :childId ORDER BY p.createdAt DESC")
    List<PointRecord> findRecordsByChild(@Param("childId") Long childId);
}
