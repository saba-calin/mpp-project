package com.mpp.studentmanagement.car;

import com.mpp.studentmanagement.student.Student;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findAllByStudentId(Integer studentId);
}
