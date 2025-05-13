package com.mpp.studentmanagement.suspicioususer;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuspiciousUserDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private String username;
}
