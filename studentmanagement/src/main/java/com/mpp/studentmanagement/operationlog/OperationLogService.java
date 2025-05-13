package com.mpp.studentmanagement.operationlog;

import com.mpp.studentmanagement.auth.model.User;
import com.mpp.studentmanagement.auth.repository.UserRepository;
import com.mpp.studentmanagement.auth.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class OperationLogService {
    private final OperationLogRepository operationLogRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public void addOperation(OperationLogRequest operationLog) {
        String username = this.jwtService.extractUsername(operationLog.getToken());
        Optional<User> user = this.userRepository.findUserByUsername(username);

        if (user.isPresent() && !user.get().getRole().toString().equals("ADMIN")) {
            OperationLog newOperationLog = OperationLog.builder()
                    .userId(user.get().getId())
                    .operation(operationLog.getOperation())
                    .date(operationLog.getDate())
                    .build();
            this.operationLogRepository.save(newOperationLog);
        }
    }
}
