package com.mpp.studentmanagement.car;

import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentRepository;
import com.mpp.studentmanagement.student.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    CarRepository carRepository;
    StudentService studentService;

    public CarService(CarRepository carRepository, StudentService studentService) {
        this.carRepository = carRepository;
        this.studentService = studentService;
    }

    public void addCar(Car car) {
        this.carRepository.save(car);
    }

    @Transactional
    public void updateCar(int carId, CarRequest carRequest) {
        Student student = this.studentService.getStudentById(carRequest.getStudentId());
        Car car = getCarById(carId);

        car.setBrand(carRequest.getBrand());
        car.setKm(carRequest.getKm());
        car.setYear(carRequest.getYear());
        car.setStudent(student);
    }

    public List<Car> getCarsByStudent(Student student) {
        return this.carRepository.findAllByStudent(student);
    }

    public Car getCarById(int id) {
        return this.carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));
    }

    public void deleteCar(int carId) {
        this.carRepository.deleteById(carId);
    }
}
