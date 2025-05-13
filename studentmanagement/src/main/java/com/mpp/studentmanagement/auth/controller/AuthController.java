package com.mpp.studentmanagement.auth.controller;

import com.mpp.studentmanagement.auth.model.AuthResponse;
import com.mpp.studentmanagement.auth.model.User;
import com.mpp.studentmanagement.auth.service.AuthService;
import com.mpp.studentmanagement.exception.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User request) {
        return ResponseEntity.ok(this.authService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User request) throws UserAlreadyExistsException {
        return ResponseEntity.ok(this.authService.register(request));
    }
}
