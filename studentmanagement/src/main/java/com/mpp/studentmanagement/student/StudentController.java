package com.mpp.studentmanagement.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// silver: offline support -- local storage
// endless scrolling
// server deployed

// gold: generation on the backend
// photo upload
// path
@RestController
@RequestMapping("api/v1/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @GetMapping("{studentId}")
    public Student getStudentById(@PathVariable("studentId") int studentId) {
        return this.studentService.getStudentById(studentId);
    }

    @PostMapping
    public void addStudent(@RequestPart("student") String studentJson,
                           @RequestPart(value = "photo", required = false) MultipartFile photo) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Student student = objectMapper.readValue(studentJson, Student.class);
        this.studentService.addStudent(student, photo);
    }

    @PutMapping
    public void updateStudent(@RequestBody Student student) {
        this.studentService.updateStudent(student);
    }

    @DeleteMapping("{studentId}")
    public void deleteStudent(@PathVariable("studentId") int studentId) {
        this.studentService.deleteStudent(studentId);
    }

    @DeleteMapping("drop-table")
    public void dropTable() {
        this.studentService.dropTable();
    }
}
