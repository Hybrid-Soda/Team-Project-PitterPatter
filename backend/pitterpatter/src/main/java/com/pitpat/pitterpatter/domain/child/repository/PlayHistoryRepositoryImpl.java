package com.pitpat.pitterpatter.domain.child.repository;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRankDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

public class PlayHistoryRepositoryImpl implements PlayHistoryRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<ChildRankDTO> findRankings(Long childId) {
        String sql = "WITH RankedScores AS ( " +
                "SELECT pr.child_id AS childId, MAX(pr.score) AS maxScore, DENSE_RANK() OVER (ORDER BY MAX(pr.score) DESC) AS ranking " +
                "FROM play_record pr " +
                "GROUP BY pr.child_id " +
                ") " +
                "SELECT rs.childId, rs.maxScore, rs.ranking, c.nickname, c.profile_image " +
                "FROM RankedScores rs " +
                "JOIN child c ON rs.childId = c.child_id " +
                "WHERE rs.ranking <= 3 " +
                "OR rs.childId = :childId " +
                "OR rs.ranking BETWEEN (SELECT rs2.ranking - 1 FROM RankedScores rs2 WHERE rs2.childId = :childId) " +
                "AND (SELECT rs2.ranking + 1 FROM RankedScores rs2 WHERE rs2.childId = :childId) " +
                "ORDER BY rs.ranking";

        Query query = em.createNativeQuery(sql, "ChildRankMapping");
        query.setParameter("childId", childId);
        return query.getResultList();
    }
}
