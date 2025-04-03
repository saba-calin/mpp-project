package com.mpp.studentmanagement;

import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentRepository;
import com.mpp.studentmanagement.student.StudentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @Test
    void testGetAllStudents() {
        Student student1 = new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0);
        Student student2 = new Student(2, "Jane", "Doe", "jane.doe@gmail.com", 10, 10.0);
        List<Student> students = Arrays.asList(student1, student2);

        when(studentRepository.findAll()).thenReturn(students);

        List<Student> result = studentService.getAllStudents();
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getFirstName());
        assertEquals("Jane", result.get(1).getFirstName());
        verify(studentRepository, times(1)).findAll();
    }

    @Test
    void testAddStudent() {
        Student student = new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0);
        studentService.addStudent(student);
        verify(studentRepository, times(1)).save(student);
    }

//    @Test
//    void testUpdateStudent() {
//        Student student = new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0);
//        Student existingStudent = new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0);
//
//        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(existingStudent));
//
//        studentService.updateStudent(student);
//
//        verify(studentRepository, times(1)).findById(student.getId());
//        verify(studentRepository, times(1)).save(existingStudent);
//    }

    @Test
    void testGetStudentById() {
        int studentId = 1;
        Student student = new Student(studentId, "John", "Doe", "john.doe@gmail.com", 10, 10.0);

        when(studentRepository.findById(studentId)).thenReturn(Optional.of(student));

        Student result = studentService.getStudentById(studentId);

        assertNotNull(result);
        assertEquals(studentId, result.getId());
        verify(studentRepository, times(1)).findById(studentId);
    }

    @Test
    void testDeleteStudent() {
        int studentId = 1;

        studentService.deleteStudent(studentId);

        verify(studentRepository, times(1)).deleteById(studentId);
    }

    @Test
    void testDropTable() {
        studentService.dropTable();

        verify(studentRepository, times(1)).deleteAll();
    }
}
