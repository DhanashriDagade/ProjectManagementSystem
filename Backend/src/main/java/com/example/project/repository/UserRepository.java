package com.example.project.repository;

import com.example.project.entity.Project;
import com.example.project.entity.User;
import com.example.project.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // Find employees by manager id and role
    List<User> findByManagerIdAndRole(Long managerId, Role role);
    List<Project> findByManager(User manager);

}
