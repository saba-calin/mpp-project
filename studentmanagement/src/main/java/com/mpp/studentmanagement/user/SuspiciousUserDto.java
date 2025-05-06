package com.mpp.studentmanagement.user;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuspiciousUserDto {
    private int userId;
    private String username;
    private String email;
    private String userRole;
}
