package com.example.project.service;

import com.example.project.dto.ProjectDTO;
import com.example.project.entity.Project;
import com.example.project.entity.User;
import com.example.project.enums.Role;
import com.example.project.repository.ProjectRepository;
import com.example.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // Add a new project
    public Project addProject(ProjectDTO dto) {
        Project project = new Project();
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setManager(null); // initially not assigned
        return projectRepository.save(project);
    }

    // Update existing project
    public Project updateProject(Long projectId, ProjectDTO dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        return projectRepository.save(project);
    }

    // Delete project
    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projectRepository.delete(project);
    }

    // Assign project to manager
    public Project assignProjectToManager(Long projectId, Long managerId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        if (manager.getRole() != Role.ROLE_MANAGER) {
            throw new RuntimeException("User is not a manager");
        }

        project.setManager(manager);
        return projectRepository.save(project);
    }

//    // View all projects
  public List<Project> getAllProjects() {
       return projectRepository.findAll();
   }
    
   

}
