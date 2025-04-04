package com.mpp.studentmanagement.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final String path = "/home/saba/Desktop/mpp/studentmanagement/src/main/java/com/mpp/studentmanagement/photos";

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public void addStudent(Student student, MultipartFile photo) throws IOException {
        Student savedStudent = this.studentRepository.save(student);

        if (photo.isEmpty()) {
            this.studentRepository.updateStudentPhotoPath(savedStudent.getId(), path + "/default-photo.png");
            return;
        }

        String filePath = path + "/" + savedStudent.getId() + ".png";
        photo.transferTo(new File(filePath));
        this.studentRepository.updateStudentPhotoPath(savedStudent.getId(), filePath);
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
