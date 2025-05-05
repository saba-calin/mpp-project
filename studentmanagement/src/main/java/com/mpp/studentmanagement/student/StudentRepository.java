package com.mpp.studentmanagement.student;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.path = :path WHERE s.id = :id")
    void updateStudentPhotoPath(@Param("id") Integer id, @Param("path") String path);

    @Query(value = """
        SELECT s.id,
               s.first_name,
               s.last_name,
               SUM(c.km) as totalKm
        FROM Student s
        JOIN Car c ON s.id = c.student_id
        WHERE c.year > 2020
        GROUP BY s.id
        ORDER BY totalKm DESC""", nativeQuery = true)
    List<StudentCarStatsDto> getStudentCarStats();
}
