package com.example.project.service;

import com.example.project.dto.EmployeeDto;
import com.example.project.dto.RegisterRequest;
import com.example.project.entity.EmployeeProject;
import com.example.project.entity.Project;
import com.example.project.entity.User;
import com.example.project.enums.Role;
import com.example.project.repository.EmployeeProjectRepository;
import com.example.project.repository.ProjectRepository;
import com.example.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProjectRepository projectRepository;
    private final EmployeeProjectRepository employeeProjectRepository;

    /**
     * Register a new employee under a specific manager.
     * @param request RegisterRequest DTO with employee details
     * @param managerId the manager's user id
     * @return saved User entity for the new employee
     */
    public User registerEmployee(RegisterRequest request, Long managerId) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found with ID: " + managerId));

        User employee = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .gender(request.getGender())
                .phone(request.getPhone())
                .city(request.getCity())
                .pincode(request.getPincode())
                .role(Role.ROLE_EMPLOYEE)
                .manager(manager)
                .build();

        return userRepository.save(employee);
    }

    /**
     * Get all employees who report to a given manager (converted to DTOs).
     * @param managerId manager's user id
     * @return list of employee DTOs
     */
    public List<EmployeeDto> getEmployeesByManager(Long managerId) {
        List<User> employees = userRepository.findByManagerIdAndRole(managerId, Role.ROLE_EMPLOYEE);

        return employees.stream()
                .map(emp -> new EmployeeDto(
                        emp.getId(),
                        emp.getFirstName(),
                        emp.getLastName(),
                        emp.getEmail(),
                        emp.getGender(),
                        emp.getPhone(),
                        emp.getCity(),
                        emp.getPincode()
                ))
                .collect(Collectors.toList());
    }

    /**
     * Assign a project to multiple employees.
     * @param projectId the project ID
     * @param employeeIds list of employee IDs
     */
    public void assignProjectToEmployees(Long projectId, List<Long> employeeIds) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + projectId));

        for (Long empId : employeeIds) {
            User employee = userRepository.findById(empId)
                    .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + empId));

            if (!employee.getRole().equals(Role.ROLE_EMPLOYEE)) {
                throw new RuntimeException("User is not an employee: " + empId);
            }

            EmployeeProject assignment = EmployeeProject.builder()
                    .employee(employee)
                    .project(project)
                    .build();

            employeeProjectRepository.save(assignment);
        }
    }

    /**
     * Get all projects assigned to a manager.
     * @param managerId manager's user id
     * @return list of projects
     */
    public List<Project> getProjectsByManager(Long managerId) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found with ID: " + managerId));

        return projectRepository.findByManager(manager);
    }
}
