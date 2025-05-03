package com.mpp.studentmanagement.car;

import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentRepository;
import com.mpp.studentmanagement.student.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/cars")
public class CarController {
    CarService carService;
    StudentService studentService;

    public CarController(CarService carService, StudentService studentService) {
        this.carService = carService;
        this.studentService = studentService;
    }

    @PostMapping
    public void addCar(@RequestBody CarRequest carRequest) {
        Student student = this.studentService.getStudentById(carRequest.getStudentId());
        Car car = Car.builder()
                .brand(carRequest.getBrand())
                .year(carRequest.getYear())
                .km(carRequest.getKm())
                .student(student)
                .build();
        this.carService.addCar(car);
    }
}
