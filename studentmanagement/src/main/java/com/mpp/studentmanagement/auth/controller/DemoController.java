package com.mpp.studentmanagement.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class DemoController {

    @GetMapping("/admin")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("Hello from admin");
    }

    @GetMapping("/user")
    public ResponseEntity<String> user() {
        return ResponseEntity.ok("Hello from user");
    }

    @GetMapping("/noauth")
    public ResponseEntity<String> noauth() {
        return ResponseEntity.ok("Hello noauth");
    }
}
