package com.mpp.studentmanagement.user;

import com.mpp.studentmanagement.background.OperationMonitorService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final OperationMonitorService operationMonitorService;

    public UserService(UserRepository userRepository, OperationMonitorService operationMonitorService) {
        this.userRepository = userRepository;
        this.operationMonitorService = operationMonitorService;
    }

    public void addUser(User user) {
        Optional<User> existingUser = this.userRepository.findUserByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        this.userRepository.save(user);
    }

    public User checkIfUserExists(UserRequest userRequest) {
        Optional<User> existingUser = this.userRepository.findUserByUsernameAndPassword(userRequest.getUsername(), userRequest.getPassword());
        return existingUser.orElseThrow(() -> new RuntimeException("User does not exist"));
    }

    public List<SuspiciousUserDto> getSuspiciousUsers() {
        List<SuspiciousUserDto> suspiciousUsers = new ArrayList<>();
        List<Integer> ids = this.operationMonitorService.getSuspiciousUsersIds();

        for (int id : ids) {
            Optional<User> user = this.userRepository.findById(id);
            user.ifPresent(u -> {
                if (u.getUserRole().equals("admin")) {
                    return;
                }

                SuspiciousUserDto suspiciousUser = SuspiciousUserDto.builder()
                        .userId(u.getId())
                        .username(u.getUsername())
                        .email(u.getEmail())
                        .userRole(u.getUserRole())
                        .build();
                suspiciousUsers.add(suspiciousUser);
            });
        }

        return suspiciousUsers;
    }
}
