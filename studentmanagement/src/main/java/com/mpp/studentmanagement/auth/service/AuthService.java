package com.mpp.studentmanagement.auth.service;

import com.mpp.studentmanagement.auth.model.AuthResponse;
import com.mpp.studentmanagement.auth.model.User;
import com.mpp.studentmanagement.auth.repository.UserRepository;
import com.mpp.studentmanagement.exception.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(User request) throws UserAlreadyExistsException {
        Optional<User> existingUser = this.userRepository.findUserByUsername(request.getUsername());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User with username " + request.getUsername() + " already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        user = this.userRepository.save(user);
        String token = this.jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    public AuthResponse authenticate(User request) {
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User existingUser = this.userRepository.findUserByUsername(request.getUsername()).orElseThrow(() ->
                new UsernameNotFoundException("User with username " + request.getUsername() + " not found"));
        String token = this.jwtService.generateToken(request);
        return new AuthResponse(token);
    }
}
