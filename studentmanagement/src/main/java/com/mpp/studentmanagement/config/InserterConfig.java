package com.mpp.studentmanagement.config;

import com.github.javafaker.Faker;
import com.mpp.studentmanagement.car.Car;
import com.mpp.studentmanagement.car.CarRepository;
import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;
import java.util.List;
import java.util.Random;

@Configuration
public class InserterConfig {
    private final int TARGET_STUDENTS = 500;
    private final int TARGET_CARS = 500;

    private final Faker faker = new Faker();
    private final Random random = new Random();
    private final List<String> CAR_BRANDS = List.of(
            "Toyota", "Ford", "BMW", "Mercedes", "Volkswagen", "Audi",
            "Honda", "Chevrolet", "Nissan", "Kia", "Hyundai", "Peugeot", "Porsche",
            "Subaru", "Mazda", "Fiat", "Land Rover", "Jaguar", "Lexus"
    );

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

            List<Student> students = this.studentRepository.findAll().stream().limit(100).toList();
            int carCount = this.carRepository.findAll().size();
            if (carCount < this.TARGET_CARS) {
                int target = this.TARGET_CARS - carCount;
                for (int i = 0; i < target; i++) {
                    addCar(students);
                }
            }
        };
    }

    private void addStudent() {
        String firstName = this.faker.name().firstName();
        String lastName = this.faker.name().lastName();
        String email = this.faker.internet().emailAddress(firstName.toLowerCase() + "." + lastName.toLowerCase());
        int age = this.faker.number().numberBetween(10, 100);
        int grade = this.faker.number().numberBetween(1, 11);
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

    private void addCar(List<Student> students) {
        Student randomStudent = students.get(this.random.nextInt(students.size()));
        String brand = this.CAR_BRANDS.get(this.random.nextInt(this.CAR_BRANDS.size()));
        int year = this.faker.number().numberBetween(2000, 2025);
        int km = this.faker.number().numberBetween(0, 250_000);

        Car car = Car.builder()
                .brand(brand)
                .year(year)
                .km(km)
                .student(randomStudent)
                .build();
        this.carRepository.save(car);
    }
}
