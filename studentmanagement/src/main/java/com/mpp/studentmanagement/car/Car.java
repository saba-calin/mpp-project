package com.mpp.studentmanagement.car;

import com.mpp.studentmanagement.student.Student;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String brand;
    private Integer year;
    private Integer km;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Override
    public String toString() {
        return brand + " " + year + " " + km;
    }
}
