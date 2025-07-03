package com.example.project.service;

import com.example.project.dto.RegisterRequest;
import com.example.project.dto.EmployeeProjectStatusDTO;
import com.example.project.entity.EmployeeProject;
import com.example.project.entity.User;
import com.example.project.enums.Role;
import com.example.project.repository.EmployeeProjectRepository;
import com.example.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployeeProjectRepository employeeProjectRepository;

    // Register a new Manager
    public User registerManager(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User manager = new User();
        manager.setFirstName(request.getFirstName());
        manager.setLastName(request.getLastName());
        manager.setEmail(request.getEmail());
        manager.setPassword(passwordEncoder.encode(request.getPassword()));
        manager.setGender(request.getGender());
        manager.setPhone(request.getPhone());
        manager.setCity(request.getCity());
        manager.setPincode(request.getPincode());
        manager.setRole(Role.ROLE_MANAGER);

        return userRepository.save(manager);
    }

    // View all managers
    public List<User> getAllManagers() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.ROLE_MANAGER)
                .toList();
    }

    // Update manager info by id
    public User updateManager(Long id, RegisterRequest request) {
        User manager = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        if (!manager.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        manager.setFirstName(request.getFirstName());
        manager.setLastName(request.getLastName());
        manager.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            manager.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        manager.setGender(request.getGender());
        manager.setPhone(request.getPhone());
        manager.setCity(request.getCity());
        manager.setPincode(request.getPincode());

        return userRepository.save(manager);
    }

    // Delete manager by id
    public void deleteManager(Long id) {
        User manager = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        userRepository.delete(manager);
    }

    //  NEW: Get all employees
    public List<User> getAllEmployees() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.ROLE_EMPLOYEE)
                .toList();
    }

    //  NEW: Get all employee project statuses
    public List<EmployeeProjectStatusDTO> getAllEmployeeProjectStatuses() {
        List<EmployeeProject> employeeProjects = employeeProjectRepository.findAll();

        return employeeProjects.stream().map(ep -> {
            User employee = ep.getEmployee();
            return new EmployeeProjectStatusDTO(
                    ep.getId(),
                    employee.getId(),
                    employee.getFirstName() + " " + employee.getLastName(),
                    employee.getEmail(),
                    ep.getProject().getId(),
                    ep.getProject().getName(),
                    ep.getProject().getDescription(),
                    ep.getTaskStatus()
            );
        }).collect(Collectors.toList());
    }
    
    
}
