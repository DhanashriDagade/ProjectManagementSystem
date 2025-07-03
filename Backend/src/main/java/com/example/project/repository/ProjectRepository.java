package com.example.project.repository;

import com.example.project.dto.ProjectDTO;
import com.example.project.entity.Project;
import com.example.project.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByManagerId(Long managerId);
    List<Project> findByManager(User manager);
    
}
