package com.mpp.studentmanagement.config;

import com.mpp.studentmanagement.car.CarRepository;
import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;
import java.util.Random;

@Configuration
public class InserterConfig {
    private final int TARGET_STUDENTS = 100_000;
    private final int TARGET_CARS = 100_000;

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CarRepository carRepository;

    @Bean
    public ApplicationRunner loadStudents() {
        return args -> {
            int studentCount = this.studentRepository.findAll().size();
            if (studentCount < this.TARGET_STUDENTS) {
                int target = this.TARGET_STUDENTS - studentCount;
                for (int i = 0; i < target; i++) {
                    addStudent();
                }
            }

            int carCount = this.carRepository.findAll().size();
            if (carCount < this.TARGET_CARS) {
                int target = this.TARGET_CARS - carCount;
                for (int i = 0; i < target; i++) {

                }
            }
        };
    }

    private final String[] firstNames = {
            "John", "Jane", "Alice", "Bob", "Charlie",
            "David", "Emma", "Sophia", "Michael", "Lucas",
            "Olivia", "Ethan", "Amelia", "Daniel", "Grace",
            "James", "Lily", "Benjamin", "Mia", "William"
    };
    private final String[] lastNames = {
            "Doe", "Smith", "Johnson", "Brown", "Davis",
            "Miller", "Wilson", "Moore", "Taylor", "Anderson",
            "Thomas", "Jackson", "White", "Harris", "Martin",
            "Garcia", "Martinez", "Roberts", "Clark", "Lewis"
    };

    private void addStudent() {
        Random random = new Random();
        String firstName = firstNames[random.nextInt(firstNames.length)];
        String lastName = lastNames[random.nextInt(lastNames.length)];
        String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@gmail.com";
        int age = 10 + random.nextInt(91);
        int grade = 1 + random.nextInt(10);
        String path = Paths.get("photos").toAbsolutePath().toString() + "/default-photo.jpg";

        Student student = Student.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .age(age)
                .grade((double) grade)
                .path(path)
                .build();
        this.studentRepository.save(student);
    }
}
