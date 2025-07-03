package com.example.project.service;

import com.example.project.dto.EmployeeProjectStatusDTO;
import com.example.project.dto.ProjectDTO;
import com.example.project.entity.EmployeeProject;
import com.example.project.entity.Project;
import com.example.project.entity.User;
import com.example.project.enums.TaskStatus;
import com.example.project.repository.EmployeeProjectRepository;
import com.example.project.repository.ProjectRepository;
import com.example.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final EmployeeProjectRepository employeeProjectRepository;

    // For EMPLOYEE: fetch assigned projects
    public List<Project> getProjectsByEmployee(Long employeeId) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        List<EmployeeProject> assignments = employeeProjectRepository.findByEmployee(employee);
        return assignments.stream()
                .map(EmployeeProject::getProject)
                .collect(Collectors.toList());
    }

    // For EMPLOYEE: update their task status
    public void updateTaskStatus(Long employeeId, Long projectId, TaskStatus status) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        EmployeeProject assignment = employeeProjectRepository
                .findByEmployeeAndProject(employee, project)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignment.setTaskStatus(status);
        employeeProjectRepository.save(assignment);
    }

    // For MANAGER: fetch all employee-project status data
    public List<EmployeeProjectStatusDTO> getAllEmployeeProjectStatuses() {
        List<EmployeeProject> assignments = employeeProjectRepository.findAll();

        return assignments.stream().map(ep -> {
            User emp = ep.getEmployee();
            Project proj = ep.getProject();

            return new EmployeeProjectStatusDTO(
                ep.getId(),
                emp.getId(),
                emp.getFirstName() + " " + emp.getLastName(),
                emp.getEmail(),
                proj.getId(),
                proj.getName(),
                proj.getDescription(),
                ep.getTaskStatus()
            );
        }).collect(Collectors.toList());
    }

    // For MANAGER: update any employee's task status by employeeProjectId
    public void updateTaskStatusByAssignmentId(Long employeeProjectId, TaskStatus status) {
        EmployeeProject assignment = employeeProjectRepository.findById(employeeProjectId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignment.setTaskStatus(status);
        employeeProjectRepository.save(assignment);
    }
    
    public List<ProjectDTO> getProjectsWithStatusByEmployee(Long employeeId) {
        // Instead of loading full User object for findByEmployeeId
        List<EmployeeProject> assignments = employeeProjectRepository.findByEmployeeId(employeeId);

        return assignments.stream().map(ep -> {
            Project project = ep.getProject();

            ProjectDTO dto = new ProjectDTO();
            dto.setId(project.getId());
            dto.setName(project.getName());
            dto.setDescription(project.getDescription());
            dto.setStartDate(project.getStartDate());
            dto.setEndDate(project.getEndDate());
            dto.setManagerId(project.getManager() != null ? project.getManager().getId() : null);
            dto.setStatus(ep.getTaskStatus());  // set status from join table

            return dto;
        }).collect(Collectors.toList());
    }

    
    
}
