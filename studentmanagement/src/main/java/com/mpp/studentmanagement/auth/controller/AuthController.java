package com.mpp.studentmanagement.auth.controller;

import com.mpp.studentmanagement.auth.model.*;
import com.mpp.studentmanagement.auth.service.AuthService;
import com.mpp.studentmanagement.exception.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(this.authService.authenticate(request));
    }

    @PostMapping("/register/init")
    public ResponseEntity<AuthResponse> initRegister(@RequestBody User request) throws UserAlreadyExistsException {
        return ResponseEntity.ok(this.authService.initRegister(request));
    }

    @PostMapping("/register/confirm")
    public ResponseEntity<AuthResponse> confirmRegister(@RequestBody RegisterConfirmRequest request) {
        return ResponseEntity.ok(this.authService.confirmRegister(request));
    }

    @PostMapping("is-admin")
    public ResponseEntity<Boolean> isAdmin(@RequestBody TokenRequest tokenRequest) {
        return ResponseEntity.ok(this.authService.isAdmin(tokenRequest));
    }

    @PostMapping("is-user")
    public ResponseEntity<Boolean> isUser(@RequestBody TokenRequest tokenRequest) {
        return ResponseEntity.ok(this.authService.isUser(tokenRequest));
    }
}
