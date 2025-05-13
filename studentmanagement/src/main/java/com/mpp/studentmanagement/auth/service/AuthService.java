package com.mpp.studentmanagement.auth.service;

import com.mpp.studentmanagement.auth.model.*;
import com.mpp.studentmanagement.auth.repository.UserRepository;
import com.mpp.studentmanagement.exception.UserAlreadyExistsException;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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

    public AuthResponse initRegister(User request) throws UserAlreadyExistsException {
        Optional<User> existingUser = this.userRepository.findUserByUsername(request.getUsername());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("User with username " + request.getUsername() + " already exists");
        }

        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        GoogleAuthenticatorKey key = gAuth.createCredentials();

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setTwoFaSecret(key.getKey());

        user = this.userRepository.save(user);

        String otpAuthUrl = GoogleAuthenticatorQRGenerator.getOtpAuthURL("mpp", user.getUsername(), key);
        return new AuthResponse(null, otpAuthUrl);
    }

    public AuthResponse confirmRegister(RegisterConfirmRequest request) {
        User user = this.userRepository.findUserByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + request.getUsername() + " does not exist"));

        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        boolean isCodeValid = gAuth.authorize(user.getTwoFaSecret(), request.getVerificationCode());

        if (!isCodeValid) {
            throw new BadCredentialsException("Invalid verification code");
        }

        String token = this.jwtService.generateToken(user);
        return new AuthResponse(token, null);
    }

    public AuthResponse authenticate(AuthRequest request) {
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = this.userRepository.findUserByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + request.getUsername() + " does not exist"));

        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        boolean isCodeValid = gAuth.authorize(user.getTwoFaSecret(), request.getVerificationCode());

        if (!isCodeValid) {
            throw new BadCredentialsException("Invalid verification code");
        }

        String token = this.jwtService.generateToken(user);
        return new AuthResponse(token, null);
    }

    public Boolean isAdmin(TokenRequest tokenRequest) {
        String username = this.jwtService.extractUsername(tokenRequest.getToken());
        Optional<User> user = this.userRepository.findUserByUsername(username);

        if (user.isPresent() && user.get().getRole().toString().equals("ADMIN")) {
            return true;
        }
        return false;
    }
}
