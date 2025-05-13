package com.mpp.studentmanagement.auth.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenRequest {
    private String token;

    public TokenRequest(String token) {
        this.token = token;
    }
}
