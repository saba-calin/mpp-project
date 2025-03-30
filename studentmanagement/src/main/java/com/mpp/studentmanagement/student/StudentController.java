package com.mpp.studentmanagement.student;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @GetMapping
    public String getStudents() {
        return "fds";
    }

    @PostMapping
    public void addStudent(@RequestBody Student student) {
        System.out.println(student);
    }
}
