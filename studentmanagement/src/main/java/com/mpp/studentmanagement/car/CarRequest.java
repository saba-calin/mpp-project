package com.mpp.studentmanagement.car;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarRequest {
    private String brand;
    private Integer year;
    private Integer km;
    private Integer studentId;

    @Override
    public String toString() {
        return brand + " " + year + " " + km + " " + studentId;
    }
}
