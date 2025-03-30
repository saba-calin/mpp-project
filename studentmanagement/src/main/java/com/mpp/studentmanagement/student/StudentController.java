package com.mpp.studentmanagement.student;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void addStudent(@RequestBody Student student) {
        this.studentService.addStudent(student);
    }

    @PutMapping
    public void updateStudent(@RequestBody Student student) {
        this.studentService.updateStudent(student);
    }
}
