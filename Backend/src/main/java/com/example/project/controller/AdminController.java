package com.example.project.controller;

import com.example.project.dto.EmployeeProjectStatusDTO;
import com.example.project.dto.ProjectDTO;
import com.example.project.dto.RegisterRequest;
import com.example.project.entity.User;
import com.example.project.service.AdminService;
import com.example.project.service.ProjectService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/managers")
    public ResponseEntity<User> registerManager(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(adminService.registerManager(request));
    }

    @GetMapping("/managers")
    public ResponseEntity<List<User>> getManagers() {
        return ResponseEntity.ok(adminService.getAllManagers());
    }

    @PutMapping("/managers/{id}")
    public ResponseEntity<User> updateManager(@PathVariable Long id, @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(adminService.updateManager(id, request));
    }

    @DeleteMapping("/managers/{id}")
    public ResponseEntity<String> deleteManager(@PathVariable Long id) {
        adminService.deleteManager(id);
        return ResponseEntity.ok("Manager deleted successfully");
    }
    

    
    @GetMapping("/employee-project-status")
    public ResponseEntity<List<EmployeeProjectStatusDTO>> getAllEmployeeProjectStatuses() {
        return ResponseEntity.ok(adminService.getAllEmployeeProjectStatuses());
    }
}
