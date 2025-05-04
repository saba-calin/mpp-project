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

    public List<Car> getCarsByStudent(Student student) {
        return this.carRepository.findAllByStudent(student);
    }

    public void deleteCar(int carId) {
        this.carRepository.deleteById(carId);
    }
}
