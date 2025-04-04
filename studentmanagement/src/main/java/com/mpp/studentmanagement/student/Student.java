package com.mpp.studentmanagement.student;

import jakarta.persistence.*;
import lombok.*;
import org.w3c.dom.Text;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private Double grade;
    @Column(columnDefinition = "TEXT")
    private String path;

    @Override
    public String toString() {
        return firstName + " " + lastName;
    }
}
