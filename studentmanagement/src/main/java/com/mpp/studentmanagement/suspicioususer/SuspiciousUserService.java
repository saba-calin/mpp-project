package com.mpp.studentmanagement.suspicioususer;

import com.mpp.studentmanagement.auth.model.User;
import com.mpp.studentmanagement.auth.repository.UserRepository;
import com.mpp.studentmanagement.background.OperationMonitorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SuspiciousUserService {

    private final OperationMonitorService operationMonitorService;
    private final UserRepository userRepository;

    public List<SuspiciousUserDto> getSuspiciousUsers() {
        List<Integer> suspiciousUsersIds = this.operationMonitorService.getSuspiciousUsersIds();
        List<SuspiciousUserDto> suspiciousUsers = new ArrayList<>();

        for (int id : suspiciousUsersIds) {
            Optional<User> optionalUser = this.userRepository.getUserById(id);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                SuspiciousUserDto suspiciousUser = SuspiciousUserDto.builder()
                        .id(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .username(user.getUsername())
                        .build();
                suspiciousUsers.add(suspiciousUser);
            }
        }

        return suspiciousUsers;
    }
}
