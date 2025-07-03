package com.example.project.dto;

import lombok.Data;

import java.util.List;

@Data
public class AssignProjectRequest {
    private Long projectId;
    private List<Long> employeeIds;
}
