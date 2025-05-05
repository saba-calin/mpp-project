package com.mpp.studentmanagement.car;

import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cars")
public class CarController {
    private final CarService carService;
    private final StudentService studentService;

    public CarController(CarService carService, StudentService studentService) {
        this.carService = carService;
        this.studentService = studentService;
    }

    @GetMapping("{studentId}")
    public List<Car> getCarsByStudentId(@PathVariable("studentId") int studentId) {
        System.out.println(studentId);
        Student student = this.studentService.getStudentById(studentId);
        return this.carService.getCarsByStudent(student);
    }

    @GetMapping
    public Car getCarById(@RequestParam("id") int id) {
        return this.carService.getCarById(id);
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

    @PutMapping
    public void updateCar(
            @RequestParam("id") int id,
            @RequestBody CarRequest carRequest) {
        this.carService.updateCar(id, carRequest);
    }

    @DeleteMapping("{id}")
    public void deleteCar(@PathVariable("id") int id) {
        this.carService.deleteCar(id);
    }

    @DeleteMapping("drop-table")
    public void dropTable() {
        this.carService.dropTable();
    }
}
