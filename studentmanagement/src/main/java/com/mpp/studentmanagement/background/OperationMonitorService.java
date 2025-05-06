package com.mpp.studentmanagement.background;

import com.mpp.studentmanagement.operationlog.OperationLogRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class OperationMonitorService {
    private final OperationLogRepository operationLogRepository;
    private List<Integer> suspiciousUsersIds = new ArrayList<>();

    public OperationMonitorService(OperationLogRepository operationLogRepository) {
        this.operationLogRepository = operationLogRepository;
    }

    @Scheduled(fixedRate = 5, timeUnit = TimeUnit.SECONDS)
    public void checkForSuspiciousUsers() {
        this.suspiciousUsersIds = this.operationLogRepository.findSuspiciousUsersIds(LocalDate.now());
    }

    public List<Integer> getSuspiciousUsersIds() {
        return this.suspiciousUsersIds;
    }
}
