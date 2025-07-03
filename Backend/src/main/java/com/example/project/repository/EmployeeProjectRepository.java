// package: com.example.project.repository

package com.example.project.repository;

import com.example.project.entity.EmployeeProject;
import com.example.project.entity.Project;
import com.example.project.entity.User;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeProjectRepository extends JpaRepository<EmployeeProject, Long> {

    List<EmployeeProject> findByEmployee(User employee);

    List<EmployeeProject> findByProject(Project project);
    
    Optional<EmployeeProject> findByEmployeeAndProject(User employee, Project project);
    
        List<EmployeeProject> findAll(); // For mapping employees to their projects and statuses
        List<EmployeeProject> findByEmployeeId(Long employeeId);
    
}
