package com.example.project.dto;

import com.example.project.enums.TaskStatus;
import lombok.Data;

@Data
public class TaskStatusUpdateRequest {
    private TaskStatus status;
}
