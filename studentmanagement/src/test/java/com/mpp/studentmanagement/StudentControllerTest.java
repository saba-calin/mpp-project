package com.mpp.studentmanagement;

import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mpp.studentmanagement.student.Student;
import com.mpp.studentmanagement.student.StudentController;
import com.mpp.studentmanagement.student.StudentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class StudentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private StudentService studentService;

    @InjectMocks
    private StudentController studentController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(studentController).build();
    }

    @Test
    void testGetAllStudents() throws Exception {
        List<Student> students = Arrays.asList(new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0),
                                               new Student(2, "Jane", "Doe", "jane.doe@gmail.com", 10, 10.0));
        when(studentService.getAllStudents()).thenReturn(students);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/students"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(students.size()));

        verify(studentService, times(1)).getAllStudents();
    }

    @Test
    void testGetStudentById() throws Exception {
        int studentId = 1;
        Student student = new Student(studentId, "John", "Doe", "john.doe@gmail.com", 10, 10.0);

        when(studentService.getStudentById(studentId)).thenReturn(student);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/students/{studentId}", studentId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(studentId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("john.doe@gmail.com"));

        verify(studentService, times(1)).getStudentById(studentId);
    }

//    @Test
//    void testAddStudent() throws Exception {
//        Student student = new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0);
//
//        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/students")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(student)))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//
//        verify(studentService, times(1)).addStudent(any(Student.class));
//    }

    @Test
    void testUpdateStudent() throws Exception {
        Student student = new Student(1, "John", "Doe", "john.doe@gmail.com", 10, 10.0);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(student)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(studentService, times(1)).updateStudent(any(Student.class));
    }

    @Test
    void testDeleteStudent() throws Exception {
        int studentId = 1;

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/students/{studentId}", studentId))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(studentService, times(1)).deleteStudent(studentId);
    }


    @Test
    void testDropTable() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/students/drop-table"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        verify(studentService, times(1)).dropTable();
    }
}
