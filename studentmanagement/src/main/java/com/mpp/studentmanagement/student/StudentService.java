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
        // save the student to the get id first
        Student savedStudent = this.studentRepository.save(student);

        // /home/saba/Desktop/mpp/studentmanagement/src/main/java/com/mpp/studentmanagement/photos



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

    public void deleteStudent(int studentId) {
        this.studentRepository.deleteById(studentId);
    }

    public void dropTable() {
        this.studentRepository.deleteAll();
    }
}
