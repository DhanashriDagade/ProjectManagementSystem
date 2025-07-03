package com.example.project.dto;

import com.example.project.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeProjectStatusDTO {
    private Long employeeProjectId;
    private Long employeeId;
    private String employeeName;
    private String employeeEmail;
    private Long projectId;
    private String projectName;
    private String projectDescription;
    private TaskStatus taskStatus;
}
