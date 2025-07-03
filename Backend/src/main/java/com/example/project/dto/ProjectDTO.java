package com.example.project.dto;
import com.example.project.enums.TaskStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long managerId; // to assign project to a manager by ID
    private TaskStatus status;
    
}
