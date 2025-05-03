package com.mpp.studentmanagement.student;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mpp.studentmanagement.car.Car;
import jakarta.persistence.*;
import lombok.*;
import org.w3c.dom.Text;

import java.util.List;

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

    @OneToMany(
            mappedBy = "student",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Car> cars;

    @Override
    public String toString() {
        return firstName + " " + lastName;
    }
}
