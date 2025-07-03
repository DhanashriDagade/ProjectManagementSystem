package com.example.project.controller;

import com.example.project.dto.ProjectDTO;
import com.example.project.dto.TaskStatusUpdateRequest;
import com.example.project.entity.Project;
import com.example.project.security.UserDetailsImpl;
import com.example.project.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYEE')")
public class EmployeeController {

    private final EmployeeService employeeService;

    // Return projects with task status as DTO
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getAssignedProjects(
            @AuthenticationPrincipal UserDetailsImpl currentUser) {
        Long employeeId = currentUser.getId();
        List<ProjectDTO> projects = employeeService.getProjectsWithStatusByEmployee(employeeId);
        return ResponseEntity.ok(projects);
    }

    @PutMapping("/project-status/{projectId}")
    public ResponseEntity<String> updateProjectStatus(
            @PathVariable Long projectId,
            @RequestBody TaskStatusUpdateRequest request,
            @AuthenticationPrincipal UserDetailsImpl currentUser) {

        Long employeeId = currentUser.getId();
        employeeService.updateTaskStatus(employeeId, projectId, request.getStatus());

        return ResponseEntity.ok("Task status updated.");
    }
}
