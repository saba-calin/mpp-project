package com.mpp.studentmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StudentManagementAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementAppApplication.class, args);
	}

}
