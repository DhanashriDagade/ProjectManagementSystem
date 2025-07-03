package com.example.project.dto;

import lombok.Data;

@Data
public class ContactMessageRequest {
    private String name;
    private String email;
    private String message;
}
