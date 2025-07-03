package com.example.project.controller;

import com.example.project.dto.AssignProjectRequest;
import com.example.project.dto.EmployeeDto;
import com.example.project.dto.EmployeeProjectStatusDTO;
import com.example.project.dto.RegisterRequest;
import com.example.project.dto.TaskStatusUpdateRequest;
import com.example.project.entity.Project;
import com.example.project.entity.User;
import com.example.project.security.UserDetailsImpl;
import com.example.project.service.EmployeeService;
import com.example.project.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
@PreAuthorize("hasRole('MANAGER')")
public class ManagerController {

    private final ManagerService managerService;
    private final EmployeeService employeeService; // Injected to reuse status logic

    @PostMapping("/employees")
    public ResponseEntity<User> registerEmployee(
            @RequestBody RegisterRequest request,
            @AuthenticationPrincipal UserDetailsImpl currentUser) {

        Long managerId = currentUser.getId();
        User employee = managerService.registerEmployee(request, managerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(employee);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDto>> getEmployees(
            @AuthenticationPrincipal UserDetailsImpl currentUser) {

        Long managerId = currentUser.getId();
        List<EmployeeDto> employees = managerService.getEmployeesByManager(managerId);

        return ResponseEntity.ok(employees);
    }

    @PostMapping("/assign-project")
    public ResponseEntity<String> assignProject(
            @RequestBody AssignProjectRequest request) {

        managerService.assignProjectToEmployees(request.getProjectId(), request.getEmployeeIds());

        return ResponseEntity.ok("Project assigned successfully.");
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects(
            @AuthenticationPrincipal UserDetailsImpl currentUser) {

        Long managerId = currentUser.getId();
        List<Project> projects = managerService.getProjectsByManager(managerId);

        return ResponseEntity.ok(projects);
    }

    // ✅ NEW: Get all employee-project-task statuses
    @GetMapping("/assignments")
    public ResponseEntity<List<EmployeeProjectStatusDTO>> getAllAssignments() {
        List<EmployeeProjectStatusDTO> allStatuses = employeeService.getAllEmployeeProjectStatuses();
        return ResponseEntity.ok(allStatuses);
    }

    // ✅ NEW: Manager updates task status for any assignment
    @PutMapping("/assignment-status/{employeeProjectId}")
    public ResponseEntity<String> updateAssignmentStatus(
            @PathVariable Long employeeProjectId,
            @RequestBody TaskStatusUpdateRequest request) {

        employeeService.updateTaskStatusByAssignmentId(employeeProjectId, request.getStatus());
        return ResponseEntity.ok("Task status updated by manager.");
    }
}
