package com.mpp.studentmanagement.car;

import com.mpp.studentmanagement.student.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public void addCar(Car car) {
        this.carRepository.save(car);
    }

    public void updateCar(CarRequest carRequest, Student student) {

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
