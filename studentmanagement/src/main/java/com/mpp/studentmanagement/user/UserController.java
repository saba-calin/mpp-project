//package com.mpp.studentmanagement.user;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("api/v1/user")
//public class UserController {
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("suspicious")
//    public List<SuspiciousUserDto> getSuspiciousUsers() {
//        return this.userService.getSuspiciousUsers();
//    }
//
//    @PostMapping("register")
//    public void addUser(@RequestBody User user) {
//        this.userService.addUser(user);
//    }
//
//    @PostMapping("login")
//    public ResponseEntity<User> checkIfUserExists(@RequestBody UserRequest userRequest) {
//        User user = this.userService.checkIfUserExists(userRequest);
//        return ResponseEntity.ok(user);
//    }
//}
