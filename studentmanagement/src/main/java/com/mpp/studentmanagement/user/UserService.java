package com.mpp.studentmanagement.user;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
