package com.mpp.studentmanagement.student;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE Student s SET s.path = :path WHERE s.id = :id")
    void updateStudentPhotoPath(@Param("id") Integer id, @Param("path") String path);
}
