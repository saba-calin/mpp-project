package com.mpp.studentmanagement.operationlog;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/logs")
public class OperationLogController {
    private final OperationLogService operationLogService;

    public OperationLogController(OperationLogService operationLogService) {
        this.operationLogService = operationLogService;
    }

    @PostMapping
    public void addOperation(@RequestBody OperationLogRequest request) {
        this.operationLogService.addOperation(request);
    }
}
