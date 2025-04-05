package com.mpp.studentmanagement.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mpp.studentmanagement.background.BackgroundTaskService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
    private final BackgroundTaskService backgroundTaskService;

    public StudentController(StudentService studentService, BackgroundTaskService backgroundTaskService) {
        this.studentService = studentService;
        this.backgroundTaskService = backgroundTaskService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @GetMapping("pagination")
    public List<Student> getTopNStudents(@RequestParam(value = "count") int count) {
        return this.studentService.getTopNStudents(count);
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
    public void updateStudent(@RequestPart("student") String studentJson,
                              @RequestPart(value = "photo", required = false) MultipartFile photo) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Student student = objectMapper.readValue(studentJson, Student.class);
        this.studentService.updateStudent(student, photo);
    }

    @DeleteMapping("{studentId}")
    public void deleteStudent(@PathVariable("studentId") int studentId) {
        this.studentService.deleteStudent(studentId);
    }

    @DeleteMapping("drop-table")
    public void dropTable() {
        this.studentService.dropTable();
    }

    @GetMapping(value = "/image", produces = MediaType.IMAGE_PNG_VALUE)
    public Resource getImage(@RequestParam String path) throws MalformedURLException {
        Path filePath = Paths.get(path).normalize();
        return new UrlResource(filePath.toUri());
    }

    @PostMapping("startStopTask")
    public String startStopTask() {
        if (!this.backgroundTaskService.isRunning()) {
            this.backgroundTaskService.startTask();
            return "Task started";
        }
        else {
            this.backgroundTaskService.stopTask();
            return "Task stopped";
        }
    }
}
