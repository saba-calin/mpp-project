package com.mpp.studentmanagement.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final String path = Paths.get("photos").toAbsolutePath().toString();

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;

        File directory = new File(path);
        if (!directory.exists()) {
            directory.mkdirs();
        }
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public Resource getImage(Path filePath) throws MalformedURLException {
        System.out.println(filePath);
        return new UrlResource(filePath.toUri());
    }

    public void addStudent(Student student, MultipartFile photo) throws IOException {
        Student savedStudent = this.studentRepository.save(student);

        if (photo == null || photo.isEmpty()) {
            this.studentRepository.updateStudentPhotoPath(savedStudent.getId(), path + "/default-photo.jpg");
            return;
        }

        String filePath = path + "/" + savedStudent.getId() + ".jpg";
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

        if (photo == null || photo.isEmpty()) {
            return;
        }

        // delete the old photo if it is not the default
        if (!existingStudent.getPath().equals(path + "/default-photo.jpg")) {
            String oldPhotoPath = existingStudent.getPath();
            File oldPhotoFile = new File(oldPhotoPath);
            oldPhotoFile.delete();
        }

        // upload the new photo
        String filePath = path + "/" + existingStudent.getId() + ".jpg";
        photo.transferTo(new File(filePath));
        existingStudent.setPath(filePath);
    }

    public Student getStudentById(int studentId) {
        return this.studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void deleteStudent(int studentId) {
        this.studentRepository.deleteById(studentId);
        // delete the photo if it is not the default
        String filePath = path + "/" + studentId + ".jpg";
        File photoFile = new File(filePath);
        if (photoFile.exists()) {
            photoFile.delete();
        }
    }

    public void dropTable() {
        List<Student> students = this.studentRepository.findAll();
        for (Student student : students) {
            if (!student.getPath().equals(path + "/default-photo.jpg")) {
                String oldPhotoPath = student.getPath();
                File oldPhotoFile = new File(oldPhotoPath);
                oldPhotoFile.delete();
            }
        }
        this.studentRepository.deleteAll();
    }

    public List<Student> getTopNStudents(int count) {
        return this.studentRepository.findAll(PageRequest.of(0, count)).getContent();
    }

    public List<StudentCarStatsDto> getStudentCarStats() {
        return this.studentRepository.getStudentCarStats();
    }
}
