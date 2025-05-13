package com.mpp.studentmanagement.operationlog;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OperationLogRequest {
    private String token;
    private String operation;
    private LocalDate date;

    @Override
    public String toString() {
        return "OperationLogRequest{" +
                "token='" + token + '\'' +
                ", operation='" + operation + '\'' +
                ", date=" + date +
                '}';
    }
}
