package com.mpp.studentmanagement.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
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
    public void updateStudent(Student student, MultipartFile photo) throws IOException {
        Student existingStudent = this.studentRepository.findById(student.getId()).orElseThrow(() -> new RuntimeException("Student not found"));
        existingStudent.setFirstName(student.getFirstName());
        existingStudent.setLastName(student.getLastName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setAge(student.getAge());
        existingStudent.setGrade(student.getGrade());

        if (photo.isEmpty()) {
            return;
        }

        // delete the old photo if it is not the default
        if (!existingStudent.getPath().equals(path + "/default-photo.png")) {
            String oldPhotoPath = existingStudent.getPath();
            File oldPhotoFile = new File(oldPhotoPath);
            oldPhotoFile.delete();
        }

        // upload the new photo
        String filePath = path + "/" + existingStudent.getId() + ".png";
        photo.transferTo(new File(filePath));
        existingStudent.setPath(filePath);
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

    public List<Student> getTopNStudents(int count) {
        return this.studentRepository.findAll(PageRequest.of(0, count)).getContent();
    }
}
