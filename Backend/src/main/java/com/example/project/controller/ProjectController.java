package com.example.project.controller;

import com.example.project.dto.ProjectDTO;
import com.example.project.entity.Project;
import com.example.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody ProjectDTO dto) {
        return ResponseEntity.ok(projectService.addProject(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectDTO dto) {
        return ResponseEntity.ok(projectService.updateProject(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully");
    }

    @PostMapping("/{projectId}/assign/{managerId}")
    public ResponseEntity<Project> assignProject(@PathVariable Long projectId, @PathVariable Long managerId) {
        return ResponseEntity.ok(projectService.assignProjectToManager(projectId, managerId));
    }
    
    

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
 
}
