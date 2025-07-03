package com.example.project.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;
    private String phone;
    private String city;
    private String pincode;
   
}
