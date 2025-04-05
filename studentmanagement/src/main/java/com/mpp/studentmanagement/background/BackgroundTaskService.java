package com.mpp.studentmanagement.background;

import com.mpp.studentmanagement.socket.WebSocketController;
import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class BackgroundTaskService {
    private boolean isRunning = false;
    private Thread backgroundThread;

    private final StudentRepository studentRepository;
    private final WebSocketController webSocketController;

    public BackgroundTaskService(StudentRepository studentRepository, WebSocketController webSocketController) {
        this.studentRepository = studentRepository;
        this.webSocketController = webSocketController;
    }

    public void startTask() {
        if (!isRunning) {
            isRunning = true;
            backgroundThread = new Thread(() -> {
                while (isRunning) {
                    addStudent();
                    this.webSocketController.sendUpdateToClients();

                    try {
                        Thread.sleep(1000);
                    }
                    catch (Exception e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
            backgroundThread.start();
        }
    }

    public void stopTask() {
        if (isRunning) {
            isRunning = false;
            backgroundThread.interrupt();
        }
    }

    public boolean isRunning() {
        return this.isRunning;
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
        String path = "/home/saba/Desktop/mpp/studentmanagement/src/main/java/com/mpp/studentmanagement/photos/default-photo.png";

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
