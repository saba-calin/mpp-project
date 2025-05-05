package com.mpp.studentmanagement.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public void addUser(@RequestBody User user) {
        this.userService.addUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<User> checkIfUserExists(@RequestBody UserRequest userRequest) {
        User user = this.userService.checkIfUserExists(userRequest);
        return ResponseEntity.ok(user);
    }
}
