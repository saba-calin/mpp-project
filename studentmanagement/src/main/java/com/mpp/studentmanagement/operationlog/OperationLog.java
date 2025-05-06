package com.mpp.studentmanagement.operationlog;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "operation_logs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OperationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer userId;
    private String operation;
    private LocalDate date;
}
