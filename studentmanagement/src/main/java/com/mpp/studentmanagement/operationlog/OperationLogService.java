package com.mpp.studentmanagement.operationlog;

import org.springframework.stereotype.Service;

@Service
public class OperationLogService {
    private final OperationLogRepository operationLogRepository;

    public OperationLogService(OperationLogRepository operationLogRepository) {
        this.operationLogRepository = operationLogRepository;
    }

    public void addOperation(OperationLog operationLog) {
        if (operationLog.getUserId() != null) {
            this.operationLogRepository.save(operationLog);
        }
    }
}
