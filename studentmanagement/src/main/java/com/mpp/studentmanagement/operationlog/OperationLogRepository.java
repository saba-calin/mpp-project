package com.mpp.studentmanagement.operationlog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OperationLogRepository extends JpaRepository<OperationLog, Integer> {

    @Query("SELECT ol.userId FROM OperationLog ol WHERE ol.date = :today GROUP BY ol.userId HAVING COUNT(ol) > 100")
    List<Integer> findSuspiciousUsersIds(@Param("today") LocalDate today);
}
