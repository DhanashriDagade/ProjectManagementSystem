package com.example.project.entity;

import com.example.project.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})    

//Tells Jackson used for converting Java objects to JSON to ignore 
//unwanted properties that are added by Hibernate:
//hibernateLazyInitializer handler
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String gender;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String pincode;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Add this self-referential mapping:
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;
}