package com.mpp.studentmanagement.student;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public void addStudent(Student student) {
        this.studentRepository.save(student);
    }

    @Transactional
    public void updateStudent(Student student) {
        Student existingStudent = this.studentRepository.findById(student.getId()).orElseThrow(() -> new RuntimeException("Student not found"));
        existingStudent.setFirstName(student.getFirstName());
        existingStudent.setLastName(student.getLastName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setAge(student.getAge());
        existingStudent.setGrade(student.getGrade());
    }

    public Student getStudentById(int studentId) {
        return this.studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
    }
}
