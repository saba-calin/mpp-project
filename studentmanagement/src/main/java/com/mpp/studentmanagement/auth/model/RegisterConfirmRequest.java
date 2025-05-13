package com.mpp.studentmanagement.auth.model;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterConfirmRequest {
    private String username;
    private int verificationCode;
}
