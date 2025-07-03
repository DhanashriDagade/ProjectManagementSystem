package com.example.project.entity;

import jakarta.persistence.*;
import lombok.Getter; 
import lombok.Setter;

@Entity
@Table(name = "contact_messages")
@Getter
@Setter
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true, nullable = false)
    private String email;

    @Column(length = 1000)
    private String message;
}
