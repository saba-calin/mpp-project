package com.mpp.studentmanagement.suspicioususer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suspicioususer")
public class SuspiciousUserController {

    private final SuspiciousUserService suspiciousUserService;

    public SuspiciousUserController(SuspiciousUserService suspiciousUserService) {
        this.suspiciousUserService = suspiciousUserService;
    }

    @GetMapping("/users")
    public List<SuspiciousUserDto> getSuspiciousUsers() {
        return this.suspiciousUserService.getSuspiciousUsers();
    }
}
