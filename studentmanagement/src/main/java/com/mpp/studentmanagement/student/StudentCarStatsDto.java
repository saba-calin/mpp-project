package com.mpp.studentmanagement.student;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentCarStatsDto {
    private int studentId;
    private String firstName;
    private String lastName;
    private Long totalKm;
}
