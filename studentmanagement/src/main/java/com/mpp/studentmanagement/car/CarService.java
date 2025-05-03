package com.mpp.studentmanagement.car;

import org.springframework.stereotype.Service;

@Service
public class CarService {
    CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public void addCar(Car car) {
        this.carRepository.save(car);
    }
}
